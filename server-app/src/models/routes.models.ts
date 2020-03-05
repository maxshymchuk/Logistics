import { Vehicle } from './vehicles.models';
import { Location } from './locations.models';

export type Route = {
  startLocation: Location;
  endLocation: Location;
  cargos: string[];
  departureDate: Date;
  vehicle: Vehicle;
};
