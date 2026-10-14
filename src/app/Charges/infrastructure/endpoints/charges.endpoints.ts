import { environment } from '../../../../environments/environment';

/**
 * @summary Defines HTTP endpoints for charging resources.
 */
export class ChargesEndpoints {
  static readonly hubs = `${environment.apiUrl}/charging-stations`;

  static readonly orders = `${environment.apiUrl}/Vehicle-charges`;
}
