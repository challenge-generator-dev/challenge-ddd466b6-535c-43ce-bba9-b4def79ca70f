import { Controller, Get, Res, Sse } from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { OrdersService } from './orders.service';
import { OrderEventDto } from './dto/order-event.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('events')
  sse(@Res() res: Response): Observable<any> {
    return this.ordersService.getOrderEventsStream().pipe(
      map((event: OrderEventDto) => ({
        type: 'order-event',
        data: event,
      }))
    );
  }
}