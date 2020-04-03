import { Cargo } from './cargo.models';
import { Location } from './location.models';
import { Vehicle } from './vehicle.models';

export type Route = {
  _id?: string;
  startLocation: Location;
  endLocation: Location;
  cargo: Cargo[];
  departureDate: Date;
  vehicle: Vehicle;
};
