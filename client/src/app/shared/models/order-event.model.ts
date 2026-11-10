import { InjectionToken } from '@angular/core';

export interface OrderEvent {
  orderId: string;
  status: 'pending' | 'processed' | 'delivered';
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

export const ORDER_EVENTS_API_URL = new InjectionToken<string>('ORDER_EVENTS_API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:3000/api/orders/events'
});