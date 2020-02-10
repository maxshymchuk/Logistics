import * as mongoose from 'mongoose';

import { Location } from '../locations/locations.models';

export enum VehicleType {
  Plane = 'Plane',
  Car = 'Car',
  Train = 'Train'
}

export enum VehiclePriceRatio {
  Plane = 5,
  Car = 1.2,
  Train = 1
}

export enum VehicleSpeed {
  Plane = 900, // km/h
  Car = 80,
  Train = 120
}

export type Vehicle = {
  destination: Location,
  date: Date,
  type: VehicleType
}

export interface VehicleMongo extends mongoose.Document, Vehicle {}