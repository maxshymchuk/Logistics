import * as mongoose from 'mongoose';

import { locationSchema, mapSchema } from '../schemas/locations.schemas';
import { VehicleType } from './vehicles.models';

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
  cargos: string[];
};

export type PathfinderInput = {
  numVertices: number;
  startVertex: number;
  endVertex: number;
  edges: number[][];
};

export interface MapMongo extends mongoose.Document, Map {}
export interface LocationMongo extends mongoose.Document, Location {}
