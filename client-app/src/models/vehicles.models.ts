import { Location } from './locations.models';

export type VehicleProps = {
  vehicle: Vehicle;
};

export enum VehicleType {
  Plane = 'Plane',
  Car = 'Car',
  Train = 'Train'
}

export type Vehicle = {
  _id: string;
  destination: Location;
  date: string;
  type: VehicleType;
};
