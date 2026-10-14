import { Station } from '../../domain/model/stations.entity';
import { StationResource } from '../resources/stations.resource';

/**
 * @summary Converts charging station resources into domain entities.
 * @author Mateo Caldas Bravo
 */
export class StationsAssembler {
  static toEntity(resource: StationResource): Station {
    return {
      id: resource.id,
      stationName: resource.stationName,
      vehicleType: resource.vehicleType,
      maxGridKwCapacity: resource.maxGridKwCapacity,
      stallsAvailable: resource.stallsAvailable,
      isActive: resource.isActive,
      locationCoordinates: resource.locationCoordinates,
    };
  }
}
