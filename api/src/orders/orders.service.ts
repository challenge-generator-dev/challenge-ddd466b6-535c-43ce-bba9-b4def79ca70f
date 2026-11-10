import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Subject, Observable, fromEvent, takeUntil } from 'rxjs';
import { Response } from 'express';
import { KafkaService } from '../kafka/kafka.service';
import { OrderEventDto } from './dto/order-event.dto';

@Injectable()
export class OrdersService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(OrdersService.name);
  private readonly destroy$ = new Subject<void>();
  private activeConnections: Map<string, Response> = new Map();

  constructor(private readonly kafkaService: KafkaService) {}

  async onModuleInit(): Promise<void> {
    this.logger.log('OrdersService inicializado');
    
    if (!this.kafkaService.isHealthy()) {
      this.logger.warn('KafkaService no está saludable al iniciar OrdersService');
    }
  }

  async onModuleDestroy(): Promise<void> {
    this.destroy$.next();
    this.destroy$.complete();
    
    for (const [connectionId, res] of this.activeConnections) {
      if (!res.headersSent) {
        res.status(503).json({ error: 'Servicio cerrando' });
      } else {
        res.end();
      }
      this.logger.log(`Conexión SSE cerrada: ${connectionId}`);
    }
    this.activeConnections.clear();
  }

  getOrderEventsStream(): Observable<OrderEventDto> {
    this.logger.log('Obteniendo stream de eventos de órdenes');
    
    const kafkaStream = this.kafkaService.getEventsStream();
    
    return kafkaStream.pipe(
      takeUntil(this.destroy$)
    );
  }

  handleClientDisconnect(connectionId: string): void {
    this.activeConnections.delete(connectionId);
    this.logger.log(`Cliente desconectado: ${connectionId}. Conexiones activas: ${this.activeConnections.size}`);
  }

  registerConnection(connectionId: string, res: Response): void {
    this.activeConnections.set(connectionId, res);
    this.logger.log(`Nueva conexión SSE registrada: ${connectionId}. Total: ${this.activeConnections.size}`);
  }

  broadcastToAll(event: OrderEventDto): number {
    let sentCount = 0;
    const message = `data: ${JSON.stringify(event)}\n\n`;
    
    for (const [connectionId, res] of this.activeConnections) {
      try {
        if (!res.headersSent) {
          res.write(message);
          sentCount++;
        }
      } catch (error) {
        this.logger.error(`Error enviando a conexión ${connectionId}: ${error}`);
        this.activeConnections.delete(connectionId);
      }
    }
    
    return sentCount;
  }

  getActiveConnectionsCount(): number {
    return this.activeConnections.size;
  }
}