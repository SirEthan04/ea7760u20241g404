/**
 * @summary Defines the payload for creating a charging order.
 */
export interface CreateChargesOrderRequest {
  stationId: number;
  vehicleType: string;
  makeId: number;
  makeName: string;
  kwDemand: number;
  chargingPortType: string;
  isFastCharge: boolean;
  registeredAt: string;
}
