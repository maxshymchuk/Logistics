import * as mongoose from 'mongoose';
import { Track, Route } from '../models';
import { Location } from '../locations/locations.models';
import { VehicleType } from '../vehicles/vehicles.models';

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