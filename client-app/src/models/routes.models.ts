import { Location } from './locations.models';
import { Vehicle } from './vehicles.models';

export type Route = {
  _id?: string;
  startLocation: Location;
  endLocation: Location;
  cargos: string[];
  departureDate: Date;
  vehicle: Vehicle;
};
