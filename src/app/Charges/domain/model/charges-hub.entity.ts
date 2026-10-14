/**
 * @summary Represents a vehicle charging station.
 * @author Mateo Caldas Bravo
 */
export interface ChargesHub {
  id: number;
  stationName: string;
  vehicleType: string;
  maxGridKwCapacity: number;
  stallsAvailable: number;
  isActive: boolean;
  locationCoordinates: string;
}
