import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

import { ChargesHub } from '../../../domain/model/charges-hub.entity';
import { ChargesHubService } from '../../../infrastructure/services/charges-hub.service';
import { ChargesOrderRegistrationService } from '../../../application/services/charges-order-registration.service';

interface VehicleMake {
  makeId: number;
  makeName: string;
}

/**
 * @summary Provides a reactive form for registering vehicle charging orders.
 * @author Mateo Caldas Bravo
 */
@Component({
  selector: 'app-charges-order-new',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './charges-order-new.html',
  styleUrl: './charges-order-new.css',
})
export class ChargesOrderNew implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly hubService = inject(ChargesHubService);
  private readonly registrationService = inject(ChargesOrderRegistrationService);

  readonly hubs = signal<ChargesHub[]>([]);
  readonly makes = signal<VehicleMake[]>([]);
  readonly loadingMakes = signal(false);
  readonly saving = signal(false);
  readonly errorMessage = signal('');

  readonly form = this.fb.nonNullable.group({
    vehicleType: ['', Validators.required],
    makeId: [0, [Validators.required, Validators.min(1)]],
    kwDemand: [0, [Validators.required, Validators.min(0.01)]],
    chargingPortType: ['', Validators.required],
    isFastCharge: [false],
  });

  ngOnInit(): void {
    this.loadChargesHubs();
    this.listenToVehicleTypeChanges();
  }

  /**
   * @summary Loads the available charging stations.
   */
  private loadChargesHubs(): void {
    this.hubService.getAll().subscribe({
      next: (hubs) => {
        this.hubs.set(hubs);
      },
      error: () => {
        this.errorMessage.set('error-loading-charges-hubs');
      },
    });
  }

  /**
   * @summary Loads vehicle makes whenever the selected vehicle type changes.
   */
  private listenToVehicleTypeChanges(): void {
    this.form.controls.vehicleType.valueChanges.subscribe((type) => {
      this.form.controls.makeId.setValue(0);
      this.makes.set([]);
      this.errorMessage.set('');

      if (!type) {
        return;
      }

      this.loadingMakes.set(true);

      this.http.get<{ Results: { MakeId: number; MakeName: string }[] }>(
        `${environment.vehicleApiUrl}/vehicles/GetMakesForVehicleType/${encodeURIComponent(type)}`,
        { params: { format: 'json' } },
      ).subscribe({
        next: (response) => {
          if (this.form.controls.vehicleType.value !== type) {
            return;
          }

          this.makes.set(response.Results.map((make) => ({
            makeId: make.MakeId,
            makeName: make.MakeName,
          })));
          this.loadingMakes.set(false);
        },
        error: () => {
          if (this.form.controls.vehicleType.value !== type) {
            return;
          }

          this.errorMessage.set('error-loading-makes');
          this.loadingMakes.set(false);
        },
      });
    });
  }

  /**
   * @summary Validates the form and registers a charging order.
   */
  create(): void {
    if (this.form.invalid || this.saving() || this.loadingMakes()) {
      this.form.markAllAsTouched();
      return;
    }

    const { vehicleType, makeId, kwDemand, chargingPortType, isFastCharge } = this.form.getRawValue();

    const make = this.makes().find((item) => item.makeId === makeId);

    if (!make) {
      this.errorMessage.set('invalid-make');
      return;
    }

    this.saving.set(true);
    this.errorMessage.set('');

    this.registrationService
      .register(vehicleType, make.makeId, make.makeName, kwDemand, chargingPortType, isFastCharge)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage.set(this.getErrorKey(error));
          this.saving.set(false);
        },
      });
  }

  /**
   * @summary Maps registration errors to translation keys.
   */
  private getErrorKey(error: unknown): string {
    if (error instanceof Error) {
      switch (error.message) {
        case 'Charging station not found.':
          return 'hub-not-found';

        case 'Charging demand exceeds available capacity.':
          return 'capacity-exceeded';
      }
    }

    return 'error-creating-order';
  }

  /**
   * @summary Cancels the operation and navigates to Home.
   */
  cancel(): void {
    this.router.navigate(['/home']);
  }
}
