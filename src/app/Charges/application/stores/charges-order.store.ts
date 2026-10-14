import { Injectable, inject, signal } from '@angular/core';
import { ChargesOrder } from '../../domain/model/charges-order.entity';
import { ChargesOrderService } from '../../infrastructure/services/charges-order.service';

/**
 * @summary Manages charging order state using Angular Signals.
 */
@Injectable({
  providedIn: 'root',
})
export class ChargesOrderStore {
  private readonly orderService = inject(ChargesOrderService);

  private readonly ordersState = signal<ChargesOrder[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal(false);

  readonly orders = this.ordersState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  /**
   * @summary Loads charging orders from the API.
   */
  load(): void {
    this.loadingState.set(true);
    this.errorState.set(false);

    this.orderService.getAll().subscribe({
      next: (orders) => {
        this.ordersState.set(orders);
        this.loadingState.set(false);
      },
      error: () => {
        this.errorState.set(true);
        this.loadingState.set(false);
      },
    });
  }
}
