import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ChargesOrder } from '../../domain/model/charges-order.entity';
import { CreateChargesOrderRequest } from '../requests/create-charger-order.request';
import { ChargesOrderApi } from '../apis/charges-order.api';

/**
 * @summary Provides charging order operations to the application.
 */
@Injectable({
  providedIn: 'root',
})
export class ChargesOrderService {
  private readonly api = inject(ChargesOrderApi);

  getAll(): Observable<ChargesOrder[]> {
    return this.api.getAll();
  }

  create(request: CreateChargesOrderRequest): Observable<ChargesOrder> {
    return this.api.create(request);
  }
}
