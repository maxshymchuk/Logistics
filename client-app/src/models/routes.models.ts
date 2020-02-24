import { Vehicle } from './vehicles.models';
import { Location } from './locations.models';

export type Route = {
  _id?: string;
  startLocation: Location;
  endLocation: Location;
  cargos: string[];
  departureDate: Date;
  vehicle: Vehicle;
};
