import { Location } from './location.models';
import { Vehicle } from './vehicle.models';

export type Route = {
  _id?: string;
  startLocation: Location;
  endLocation: Location;
  cargos: string[];
  departureDate: Date;
  vehicle: Vehicle;
};
