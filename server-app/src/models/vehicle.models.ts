import * as mongoose from 'mongoose';

import { vehicleSchema } from '../schemas/vehicle.schemas';
import { Location } from './location.models';

export const vehicleModel = mongoose.model<VehicleMongo>(
  "vehicles",
  vehicleSchema
);

export enum VehicleType {
  Car = "Car",
  Plane = "Plane",
  Ship = "Ship",
  Train = "Train"
}

export const VehicleTypes: VehicleType[] = [
  VehicleType.Car,
  VehicleType.Plane,
  VehicleType.Ship,
  VehicleType.Train
]

export enum VehiclePriceRatio {
  Car = 1.2,
  Plane = 5,
  Ship = 3,
  Train = 1
}

export enum VehicleSpeed {
  Car = 90,
  Plane = 900,
  Ship = 50,
  Train = 120
}

export type Vehicle = {
  destination: Location;
  arrivalDate: Date;
  type: VehicleType;
};

export interface VehicleMongo extends mongoose.Document, Vehicle {}
