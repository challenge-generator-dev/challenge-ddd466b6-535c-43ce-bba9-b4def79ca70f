import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ORDER_EVENTS_API_URL } from '../../shared/models/order-event.model';
import { OrderEvent } from '../../shared/models/order-event.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderEventsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(ORDER_EVENTS_API_URL);

  private readonly _events = signal<OrderEvent[]>([]);
  readonly events = this._events.asReadonly();

  private eventSource: EventSource | null = null;

  connect(): void {
    if (this.eventSource) {
      return;
    }

    this.eventSource = new EventSource(this.apiUrl);

    this.eventSource.onmessage = (event) => {
      const newEvent: OrderEvent = JSON.parse(event.data);
      this._events.update(events => [...events, newEvent]);
    };

    this.eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      this.disconnect();
    };
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  getEvents(): Observable<OrderEvent[]> {
    return this.http.get<OrderEvent[]>(this.apiUrl);
  }
}