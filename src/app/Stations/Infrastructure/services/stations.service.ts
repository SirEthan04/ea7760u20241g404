import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Station } from '../../domain/model/stations.entity';
import { StationsApi } from '../apis/stations.api';

/**
 * @summary Provides charging station operations to the application.
 * @author Mateo Caldas Bravo
 */
@Injectable({
  providedIn: 'root',
})
export class StationsService {
  private readonly api = inject(StationsApi);

  /**
   * @summary Retrieves charging stations matching the selected vehicle type.
   */
  getByType(vehicleType: string): Observable<Station[]> {
    return this.api.getByType(vehicleType);
  }
}
