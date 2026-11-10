import { Component, Input, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrderEvent } from '../../models/order-event.model';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    DatePipe
  ],
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderCardComponent {
  private readonly _order = signal<OrderEvent | null>(null);

  readonly order = this._order.asReadonly();

  readonly statusLabel = computed(() => {
    const status = this._order()?.status;
    if (!status) return '';
    const labels: Record<string, string> = {
      pending: 'Pendiente',
      processed: 'Procesada',
      delivered: 'Entregada'
    };
    return labels[status] || status;
  });

  readonly statusIcon = computed(() => {
    const status = this._order()?.status;
    if (!status) return 'help_outline';
    const icons: Record<string, string> = {
      pending: 'hourglass_empty',
      processed: 'sync',
      delivered: 'check_circle'
    };
    return icons[status] || 'help_outline';
  });

  readonly isPending = computed(() => this._order()?.status === 'pending');
  readonly isProcessed = computed(() => this._order()?.status === 'processed');
  readonly isDelivered = computed(() => this._order()?.status === 'delivered');

  readonly statusClass = computed(() => {
    const status = this._order()?.status;
    if (!status) return '';
    return `status-${status}`;
  });

  readonly formattedDate = computed(() => {
    const date = this._order()?.updatedAt;
    if (!date) return '';
    return new Date(date).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  });

  readonly hasMetadata = computed(() => {
    const metadata = this._order()?.metadata;
    return metadata !== undefined && Object.keys(metadata).length > 0;
  });

  readonly metadataKeys = computed(() => {
    const metadata = this._order()?.metadata;
    if (!metadata) return [];
    return Object.keys(metadata);
  });

  @Input()
  set orderEvent(value: OrderEvent) {
    this._order.set(value);
  }

  getMetadataValue(key: string): string {
    const metadata = this._order()?.metadata;
    if (!metadata) return '';
    const value = metadata[key];
    return typeof value === 'object' ? JSON.stringify(value) : String(value);
  }

  trackByKey(index: number, key: string): string {
    return key;
  }
}