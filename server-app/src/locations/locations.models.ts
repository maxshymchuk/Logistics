import * as mongoose from 'mongoose';
import { VehicleType } from '../vehicles/vehicles.models';

export enum MapType {
  Roads = 'Roads',
  Railways = 'Railways',
  Searoutes = 'Searoutes'
}

export type Coordinate = {
  lat: number;
  lon: number;
};

export interface Location {
  name: string;
  coordinates: Coordinate;
}

export interface Map {
  type: MapType;
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
};

export type PathfinderInput = {
  numVertices: number;
  startVertex: number;
  endVertex: number;
  edges: number[][];
};

export interface MapMongo extends mongoose.Document, Map {}
export interface LocationMongo extends mongoose.Document, Location {}
