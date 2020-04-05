import { Location } from './location.models';

export enum VehicleType {
  Car = 'Car',
  Plane = 'Plane',
  Ship = 'Ship',
  Train = 'Train'
}

export const vehicleTypes = [
  VehicleType.Car,
  VehicleType.Plane,
  VehicleType.Ship,
  VehicleType.Train
]

export type Vehicle = {
  _id?: string;
  destination: Location;
  arrivalDate: Date;
  type: VehicleType;
};
