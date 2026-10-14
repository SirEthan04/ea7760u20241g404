import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { ChargesHub } from '../../domain/model/charges-hub.entity';
import { ChargesHubResource } from '../resources/charges-hub.resource';
import { ChargesHubAssembler } from '../assemblers/charges-hub.assembler';
import { ChargesEndpoints } from '../endpoints/charges.endpoints';

/**
 * @summary Handles HTTP operations for charging stations.
 */
@Injectable({
  providedIn: 'root',
})
export class ChargesHubApi {
  private readonly http = inject(HttpClient);

  /**
   * @summary Retrieves and transforms all charging stations.
   */
  getAll(): Observable<ChargesHub[]> {
    return this.http
      .get<ChargesHubResource[]>(ChargesEndpoints.hubs)
      .pipe(
        map((resources) => resources.map((resource) => ChargesHubAssembler.toEntity(resource))),
      );
  }
}
