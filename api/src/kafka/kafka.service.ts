import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload, KafkaMessage } from 'kafkajs';
import { Observable, Subject, map } from 'rxjs';
import { OrderEventDto } from '../orders/dto/order-event.dto';

interface OrderEventData {
  orderId: string;
  status: string;
  updatedAt: string;
  customerId: string;
}

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);
  private kafka: Kafka;
  private consumer!: Consumer;
  private readonly eventsSubject = new Subject<OrderEventDto>();
  private isConnected = false;
  private readonly retryAttempts = 3;
  private readonly retryDelay = 1000;

  private readonly config = {
    clientId: process.env.KAFKA_CLIENT_ID || 'orders-api',
    brokers: this.parseBrokers(),
    topic: process.env.KAFKA_TOPIC || 'ordenes-topic',
    groupId: process.env.KAFKA_GROUP_ID || 'orders-consumer-group',
  };

  constructor() {
    this.kafka = new Kafka({
      clientId: this.config.clientId,
      brokers: this.config.brokers,
      retry: {
        initialRetryTime: 100,
        retries: this.retryAttempts,
      },
    });
  }

  private parseBrokers(): string[] {
    const brokersEnv = process.env.KAFKA_BROKERS;
    if (!brokersEnv) {
      this.logger.warn('KAFKA_BROKERS not set, using default localhost:9092');
      return ['localhost:9092'];
    }
    return brokersEnv.split(',').map((b) => b.trim());
  }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  async connect(): Promise<void> {
    if (this.isConnected) {
      this.logger.log('Kafka consumer already connected');
      return;
    }

    try {
      this.consumer = this.kafka.consumer({ groupId: this.config.groupId });
      await this.consumer.connect();
      this.isConnected = true;
      this.logger.log(`Connected to Kafka brokers: ${this.config.brokers.join(', ')}`);
      
      await this.consumer.subscribe({ topic: this.config.topic, fromBeginning: false });
      this.logger.log(`Subscribed to topic: ${this.config.topic}`);

      await this.consumer.run({
        eachMessage: async (payload: EachMessagePayload) => {
          await this.handleMessage(payload);
        },
      });
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Failed to connect to Kafka: ${err.message}`, err.stack);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected || !this.consumer) {
      return;
    }

    try {
      await this.consumer.disconnect();
      this.isConnected = false;
      this.logger.log('Disconnected from Kafka');
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error disconnecting from Kafka: ${err.message}`, err.stack);
    }
  }

  private async handleMessage(payload: EachMessagePayload): Promise<void> {
    const { topic, partition, message } = payload;

    if (!message.value) {
      this.logger.warn(`Received message without value on ${topic}[${partition}]`);
      return;
    }

    try {
      const eventData = this.parseMessageValue(message);
      
      if (this.isValidOrderEvent(eventData)) {
        const orderEvent: OrderEventDto = {
          orderId: eventData.orderId,
          status: eventData.status as OrderEventDto['status'],
          updatedAt: new Date(eventData.updatedAt),
          customerId: eventData.customerId,
        };
        
        this.eventsSubject.next(orderEvent);
        this.logger.debug(`Processed event for order: ${orderEvent.orderId}, status: ${orderEvent.status}`);
      } else {
        this.logger.warn(`Invalid event data received: ${JSON.stringify(eventData)}`);
      }
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error processing message: ${err.message}`, err.stack);
    }
  }

  private parseMessageValue(message: KafkaMessage): OrderEventData {
    try {
      const value = message.value;
      if (!value) {
        return { orderId: '', status: '', updatedAt: '', customerId: '' };
      }
      const parsed = JSON.parse(value.toString());
      return parsed as OrderEventData;
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Failed to parse message value: ${err.message}`);
      return { orderId: '', status: '', updatedAt: '', customerId: '' };
    }
  }

  private isValidOrderEvent(data: OrderEventData): boolean {
    return (
      typeof data.orderId === 'string' &&
      data.orderId.length > 0 &&
      typeof data.status === 'string' &&
      data.status.length > 0 &&
      typeof data.updatedAt === 'string' &&
      data.updatedAt.length > 0 &&
      typeof data.customerId === 'string' &&
      data.customerId.length > 0
    );
  }

  getEventsStream(): Observable<OrderEventDto> {
    return this.eventsSubject.asObservable().pipe(
      map((event) => {
        return { ...event, updatedAt: new Date(event.updatedAt) };
      }),
    );
  }

  async reconnect(): Promise<void> {
    this.logger.log('Attempting to reconnect to Kafka...');
    await this.disconnect();
    await this.connect();
  }

  isHealthy(): boolean {
    return this.isConnected;
  }
}