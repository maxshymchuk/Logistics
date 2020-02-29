import * as mongoose from 'mongoose';
import { Location } from '../locations/locations.models';

export enum VehicleType {
  Car = 'Car',
  Plane = 'Plane',
  Ship = 'Ship',
  Train = 'Train',
  Truck = 'Truck'
}

export enum VehiclePriceRatio {
  Car = 1.2,
  Plane = 5,
  Ship = 3,
  Train = 1,
  Truck = 1.5
}

export enum VehicleSpeed {
  Car = 90,
  Plane = 900,
  Ship = 50,
  Train = 120,
  Truck = 75
}

export type Vehicle = {
  destination: Location;
  arrivalDate: Date;
  type: VehicleType;
};

export interface VehicleMongo extends mongoose.Document, Vehicle {}
