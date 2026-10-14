import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DecimalPipe } from '@angular/common';

import { ChargesHub } from '../../../domain/model/charges-hub.entity';
import { ChargesOrder } from '../../../domain/model/charges-order.entity';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * @summary Displays charging orders and power capacity for a hub.
 * @author Mateo Caldas Bravo
 */
@Component({
  selector: 'app-charges-hub-summary',
  imports: [MatCardModule, DecimalPipe, TranslatePipe],
  templateUrl: './charges-hub-summary.html',
  styleUrl: './charges-hub-summary.css',
})
export class ChargesHubSummary {
  readonly hub = input.required<ChargesHub>();
  readonly orders = input<ChargesOrder[]>([]);

  readonly totalKwDemand = computed(() =>
    this.orders().reduce((total, order) => total + order.kwDemand, 0),
  );

  readonly availableKwCapacity = computed(
    () => this.hub().maxGridKwCapacity - this.totalKwDemand(),
  );
}
