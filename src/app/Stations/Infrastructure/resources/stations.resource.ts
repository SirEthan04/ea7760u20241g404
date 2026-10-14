/** Represents the charging-stations response from the API. */
export interface StationResource {
  id: number;
  stationName: string;
  vehicleType: string;
  maxGridKwCapacity: number;
  stallsAvailable: number;
  isActive: boolean;
  locationCoordinates: string;
}
