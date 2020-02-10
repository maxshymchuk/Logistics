import * as mongoose from 'mongoose';

export type Coordinate = {
  lat: number,
  lon: number
}

export interface Location {
  name: string,
  coordinates: Coordinate
}

export interface LocationMongo extends mongoose.Document, Location {}