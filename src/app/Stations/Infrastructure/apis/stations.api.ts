import { Service, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Station } from '../../domain/model/stations.entity';
import { StationResource } from '../resources/stations.resource';
import { StationsAssembler } from '../assemblers/stations.assembler';
import { StationsEndpoints } from '../endpoints/stations.endpoints';

/**
 * @summary Handles HTTP requests for vehicle charging stations.
 * @author Mateo Caldas Bravo
 */
@Service()
export class StationsApi {
  private readonly http = inject(HttpClient);

  /**
   * @summary Retrieves all charging stations.
   */
  getAll(): Observable<Station[]> {
    return this.http
      .get<StationResource[]>(StationsEndpoints.stations)
      .pipe(map((resources) => resources.map(StationsAssembler.toEntity)));
  }

  /**
   * @summary Retrieves charging stations filtered by vehicle type.
   * @param vehicleType Type of vehicle supported by the station.
   */
  getByType(vehicleType: string): Observable<Station[]> {
    const params = new HttpParams().set('vehicleType', vehicleType);

    return this.http
      .get<StationResource[]>(StationsEndpoints.stations, { params })
      .pipe(map((resources) => resources.map(StationsAssembler.toEntity)));
  }
}
