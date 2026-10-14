import { Injectable, inject, signal } from '@angular/core';
import { ChargesHub } from '../../domain/model/charges-hub.entity';
import { ChargesHubService } from '../../infrastructure/services/charges-hub.service';

/**
 * @summary Manages charging station state using Angular Signals.
 */
@Injectable({
  providedIn: 'root',
})
export class ChargesHubStore {
  private readonly hubService = inject(ChargesHubService);

  private readonly stationsState = signal<ChargesHub[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal(false);

  readonly stations = this.stationsState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  /**
   * @summary Retrieves charging stations and updates the application state.
   */
  load(): void {
    this.loadingState.set(true);
    this.errorState.set(false);

    this.hubService.getAll().subscribe({
      next: (stations) => {
        this.stationsState.set(stations);
        this.loadingState.set(false);
      },
      error: () => {
        this.errorState.set(true);
        this.loadingState.set(false);
      },
    });
  }
}
