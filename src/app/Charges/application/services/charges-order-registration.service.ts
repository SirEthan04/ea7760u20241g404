import { Injectable, inject } from '@angular/core';
import { forkJoin, Observable, switchMap, throwError } from 'rxjs';

import { ChargesOrder } from '../../domain/model/charges-order.entity';
import { ChargesHubService } from '../../infrastructure/services/charges-hub.service';
import { ChargesOrderService } from '../../infrastructure/services/charges-order.service';

/**
 * @summary Coordinates charging order registration and capacity validation.
 */
@Injectable({ providedIn: 'root' })
export class ChargesOrderRegistrationService {
  private readonly hubService = inject(ChargesHubService);
  private readonly orderService = inject(ChargesOrderService);

  register(
    vehicleType: string,
    makeId: number,
    makeName: string,
    kwDemand: number,
    chargingPortType: string,
    isFastCharge: boolean,
  ): Observable<ChargesOrder> {
    return forkJoin({
      stations: this.hubService.getAll(),
      orders: this.orderService.getAll(),
    }).pipe(
      switchMap(({ stations, orders }) => {
        const station = stations.find((item) => item.vehicleType === vehicleType);

        if (!station) {
          return throwError(() => new Error('Charging station not found.'));
        }

        const totalKwDemand = orders
          .filter((order) => order.stationId === station.id)
          .reduce((total, order) => total + order.kwDemand, 0);

        const availableCapacity = station.maxGridKwCapacity - totalKwDemand;

        if (
          !Number.isFinite(kwDemand) ||
          kwDemand <= 0 ||
          kwDemand > availableCapacity
        ) {
          return throwError(() => new Error('Charging demand exceeds available capacity.'));
        }

        return this.orderService.create({
          stationId: station.id,
          vehicleType,
          makeId,
          makeName,
          kwDemand,
          chargingPortType,
          isFastCharge,
          registeredAt: new Date().toISOString(),
        });
      }),
    );
  }
}
