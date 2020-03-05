import { VehicleType } from './vehicles.models';

export type Coordinate = {
  lat: number;
  lon: number;
};

export type Location = {
  _id: string;
  name: string;
  coordinates: Coordinate;
};

export type Path = {
  routes: string[];
  distance: number;
  timeInterval: number;
  vehicle: VehicleType;
  price: number;
};

export type UserPath = {
  paths: Path[];
  price: number;
  distance: number;
  timeInterval: number;
  message: string;
  cargos: string[];
};
