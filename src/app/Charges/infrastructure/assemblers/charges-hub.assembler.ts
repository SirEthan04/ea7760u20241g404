import { ChargesHub } from '../../domain/model/charges-hub.entity';
import { ChargesHubResource } from '../resources/charges-hub.resource';

/**
 * @summary Converts charging station API resources into domain entities.
 * @author Mateo Caldas Bravo
 */
export class ChargesHubAssembler {
  static toEntity(resource: ChargesHubResource): ChargesHub {
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
