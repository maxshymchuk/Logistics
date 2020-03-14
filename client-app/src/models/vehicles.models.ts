import { Location } from './locations.models';

export enum VehicleType {
  Car = "Car",
  Plane = "Plane",
  Ship = "Ship",
  Train = "Train"
}

export type Vehicle = {
  _id?: string;
  destination: Location;
  arrivalDate: Date;
  type: VehicleType;
};
