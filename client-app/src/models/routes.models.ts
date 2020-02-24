import { Route } from './routes.models';
import { Track } from './tracks.models';
import { Vehicle } from './vehicles.models';

export type Route = {
  _id?: string;
  startLocation: Location;
  endLocation: Location;
  cargos: string[];
  departureDate: Date;
  vehicle: Vehicle;
};
