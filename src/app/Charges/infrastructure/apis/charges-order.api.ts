import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { ChargesOrder } from '../../domain/model/charges-order.entity';
import { ChargesOrderResource } from '../resources/charges-order.resource';
import { ChargesOrderAssembler } from '../assemblers/charges-order.assembler';
import { CreateChargesOrderRequest } from '../requests/create-charger-order.request';
import { ChargesEndpoints } from '../endpoints/charges.endpoints';

/**
 * @summary Handles HTTP operations for charging orders.
 */
@Injectable({
  providedIn: 'root',
})
export class ChargesOrderApi {
  private readonly http = inject(HttpClient);

  getAll(): Observable<ChargesOrder[]> {
    return this.http
      .get<ChargesOrderResource[]>(ChargesEndpoints.orders)
      .pipe(
        map((resources) => resources.map((resource) => ChargesOrderAssembler.toEntity(resource))),
      );
  }

  create(request: CreateChargesOrderRequest): Observable<ChargesOrder> {
    return this.http
      .post<ChargesOrderResource>(ChargesEndpoints.orders, request)
      .pipe(map((resource) => ChargesOrderAssembler.toEntity(resource)));
  }
}
