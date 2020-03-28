import { Location } from './location.models';
import { Vehicle } from './vehicle.models';

export type Route = {
  startLocation: Location;
  endLocation: Location;
  cargos: string[];
  departureDate: Date;
  vehicle: Vehicle;
};
