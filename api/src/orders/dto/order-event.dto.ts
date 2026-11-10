import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export class OrderEventDto {
  @IsString()
  @IsNotEmpty()
  orderId!: string;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status!: OrderStatus;

  @IsDateString()
  @IsNotEmpty()
  updatedAt!: Date;

  @IsString()
  @IsNotEmpty()
  customerId!: string;

  constructor(partial: Partial<OrderEventDto>) {
    Object.assign(this, partial);
  }
}