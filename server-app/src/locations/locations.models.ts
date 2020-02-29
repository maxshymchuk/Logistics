import * as mongoose from 'mongoose';

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

export interface MapMongo extends mongoose.Document, Map {}
export interface LocationMongo extends mongoose.Document, Location {}
