import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OrderEventsService } from '../../core/services/order-events.service';
import { OrderEvent } from '../../shared/models/order-event.model';
import { OrderCardComponent } from '../../shared/components/order-card/order-card.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    OrderCardComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  private readonly orderEventsService = inject(OrderEventsService);
  
  private readonly _isLoading = signal<boolean>(true);
  private readonly _error = signal<string | null>(null);
  private readonly _orders = signal<OrderEvent[]>([]);
  private readonly _connectionStatus = signal<'connected' | 'disconnected' | 'connecting'>('disconnected');
  
  readonly isLoading = computed(() => this._isLoading());
  readonly error = computed(() => this._error());
  readonly orders = computed(() => this._orders());
  readonly connectionStatus = computed(() => this._connectionStatus());
  
  readonly pendingCount = computed(() => 
    this._orders().filter(o => o.status === 'pending').length
  );
  
  readonly processedCount = computed(() => 
    this._orders().filter(o => o.status === 'processed').length
  );
  
  readonly deliveredCount = computed(() => 
    this._orders().filter(o => o.status === 'delivered').length
  );
  
  readonly hasOrders = computed(() => this._orders().length > 0);
  
  ngOnInit(): void {
    this.connectToEvents();
  }
  
  ngOnDestroy(): void {
    this.disconnectFromEvents();
  }
  
  private connectToEvents(): void {
    this._connectionStatus.set('connecting');
    this._isLoading.set(true);
    this._error.set(null);
    
    this.orderEventsService.connect();
    
    this.orderEventsService.getEvents().subscribe({
      next: (events: OrderEvent[]) => {
        this._orders.set(events);
        this._isLoading.set(false);
        this._connectionStatus.set('connected');
      },
      error: (err: Error) => {
        this._error.set(err.message || 'Error al conectar con el servicio de eventos');
        this._isLoading.set(false);
        this._connectionStatus.set('disconnected');
      }
    });
  }
  
  private disconnectFromEvents(): void {
    this.orderEventsService.disconnect();
    this._connectionStatus.set('disconnected');
  }
  
  reconnect(): void {
    this.disconnectFromEvents();
    setTimeout(() => this.connectToEvents(), 500);
  }
  
  clearError(): void {
    this._error.set(null);
  }
  
  trackByOrderId(index: number, order: OrderEvent): string {
    return order.orderId;
  }
}