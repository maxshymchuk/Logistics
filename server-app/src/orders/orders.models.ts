import * as mongoose from 'mongoose';
import { Location } from '../locations/locations.models';
import { VehicleType, Vehicle } from '../vehicles/vehicles.models';

export type Route = {
  startLocation: Location;
  endLocation: Location;
  cargos: string[];
  departureDate: Date;
  vehicle: Vehicle;
};

export enum TrackStatus {
  Pending = 'Pending',
  Transit = 'Transit',
  Completed = 'Completed'
}

export type Track = {
  route: Route;
  status: TrackStatus;
  departureDate: Date;
  arrivalDate: Date;
};

export enum OrderStatus {
  Taken = 'Taken', 
  Completed = 'Completed', 
  Canceled = 'Canceled'
}

export interface Order {
  message: string,
  tracks: Track[],
  userLogin: string,
  price: number,
  status: OrderStatus,
  routes: Route[],
  trackNumber: string
}

export interface OrderMongo extends mongoose.Document, Order {} 

export type UserOrder = {
  from: Location,
  to: Location,
  who: string,
  vehicle: VehicleType,
  cargos: string[],
  message: string
}

export type UserOrderInput = {
  from: string,
  to: string,
  who: string,
  vehicle: VehicleType,
  cargos: string[],
  message: string
}