export interface ChargesOrderResource {
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
