import { ChargesOrder } from '../../domain/model/charges-order.entity';
import { ChargesOrderResource } from '../resources/charges-order.resource';

/**
 * @summary Converts charging order API resources into domain entities.
 * @author Mateo Caldas Bravo
 */
export class ChargesOrderAssembler {
  static toEntity(resource: ChargesOrderResource): ChargesOrder {
    return {
      id: resource.id,
      stationId: resource.stationId,
      vehicleType: resource.vehicleType,
      makeId: resource.makeId,
      makeName: resource.makeName,
      kwDemand: resource.kwDemand,
      chargingPortType: resource.chargingPortType,
      isFastCharge: resource.isFastCharge,
      registeredAt: resource.registeredAt,
    };
  }
}
