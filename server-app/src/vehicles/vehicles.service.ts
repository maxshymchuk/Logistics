import * as mongoose from 'mongoose';

import { Vehicle, VehicleSpeed, VehicleType, VehiclePriceRatio, VehicleMongo } from './vehicles.models';
import { Location } from '../locations/locations.models';
import { vehicleSchema } from './vehicles.schemas';
import { cap } from '../functions';

const vehicleModel = mongoose.model<VehicleMongo>('vehicles', vehicleSchema);

export async function getNearestVehicle(location: Location, vehicleType: VehicleType): Promise<Vehicle> {
  const vehicles = (await vehicleModel.find({ type: vehicleType, 'destination.name': location.name }).sort('date'));
  return vehicles[0];
}

export function getVehicleType(name: string): VehicleType {
  return VehicleType[cap(name) as VehicleType];
}

export function getVehicleSpeed(name: string): VehicleSpeed {
  return VehicleSpeed[cap(name) as VehicleType];
}

export function getVehiclePriceRatio(name: string): VehiclePriceRatio {
  return VehiclePriceRatio[cap(name) as VehicleType];
}