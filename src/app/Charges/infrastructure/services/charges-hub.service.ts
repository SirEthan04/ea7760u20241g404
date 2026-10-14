import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ChargesHub } from '../../domain/model/charges-hub.entity';
import { ChargesHubApi } from '../apis/charges-hub.api';

/**
 * @summary Provides charging station operations to the application.
 */
@Injectable({
  providedIn: 'root',
})
export class ChargesHubService {
  private readonly api = inject(ChargesHubApi);

  getAll(): Observable<ChargesHub[]> {
    return this.api.getAll();
  }
}
