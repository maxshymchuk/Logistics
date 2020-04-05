import * as mongoose from 'mongoose';

import { locationSchema, mapSchema } from '../schemas/location.schemas';
import { Cargo } from './cargo.models';
import { VehicleType } from './vehicle.models';

export const locationModel = mongoose.model<LocationMongo>(
  "locations",
  locationSchema
);
export const mapModel = mongoose.model<MapMongo>("maps", mapSchema);

export type Coordinate = {
  lat: number;
  lon: number;
};

export interface Location {
  name: string;
  coordinates: Coordinate;
}

export enum MapType {
  Roads = "Roads",
  Railways = "Railways",
  Searoutes = "Searoutes"
}

export const MapTypes: MapType[] = [
  MapType.Railways, 
  MapType.Roads, 
  MapType.Searoutes
];

export interface Map {
  mapType: MapType;
  cities: string[];
  table: number[][];
}

export type PathInput = {
  from: string;
  to: string;
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
  timeInterval: number;
  distance: number;
  message: string;
  cargo: Cargo[];
  isPaid: boolean;
};

export type PathfinderInput = {
  numVertices: number;
  startVertex: number;
  endVertex: number;
  edges: number[][];
};

export interface MapMongo extends mongoose.Document, Map {}
export interface LocationMongo extends mongoose.Document, Location {}
