import { Module, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(OrdersModule.name);

  async onModuleInit(): Promise<void> {
    this.logger.log('OrdersModule inicializado');
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('OrdersModule destruido');
  }
}