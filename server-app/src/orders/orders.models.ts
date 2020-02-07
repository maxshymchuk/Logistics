import * as mongoose from 'mongoose';

import { Location } from '../models';

export enum TrackStatus {
  Pending = 'pending', 
  Transit = 'transit', 
  Completed = 'completed'
}

export enum VehicleType {
  Plane = 'Plane',
  Car = 'Car',
  Train = 'Train'
}

export enum VehiclePriceRatio {
  Plane = 5,
  Car = 1.2,
  Train = 1
}

export enum VehicleSpeed {
  Plane = 900, // km/h
  Car = 80,
  Train = 120
}

export interface Vehicle extends mongoose.Document {
  destination: Location,
  date: Date,
  type: VehicleType
}

export type Route ={
  startLocation: Location,
  endLocation: Location,
  cargos: string[],
  departureDate: Date,
  vehicle: Vehicle
}

export type Track = {
  route: Route,
  status: TrackStatus,
  departureDate: Date,
  arrivalDate: Date
}

export interface Order extends mongoose.Document {
  description: string,
  tracks: Track[],
  userId: string,
  price: number,
  status: boolean,
  routes: Route[]
}