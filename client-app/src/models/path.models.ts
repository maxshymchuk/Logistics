import { VehicleType } from './vehicle.models';

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