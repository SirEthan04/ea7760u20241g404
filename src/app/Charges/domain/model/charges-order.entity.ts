/**
 * @summary Represents a vehicle charging order.
 * @author Mateo Caldas Bravo
 */
export interface ChargesOrder {
  id: number;
  stationId: number;
  vehicleType: string;
  makeId: number;
  makeName: string;
  kwDemand: number;
  chargingPortType: string;
  isFastCharge: boolean;
  registeredAt: string;
}
