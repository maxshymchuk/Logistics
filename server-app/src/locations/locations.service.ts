import * as mongoose from 'mongoose';
import { Location, LocationMongo, Coordinate } from './locations.models';
import { locationSchema } from './locations.schemas';

export type CallbackType<T> = (err: any, res: T) => void;

const locationModel = mongoose.model<LocationMongo>('locations', locationSchema);

export async function getLocations(): Promise<Location[]> {
  const locations = await locationModel.find().catch<Location[]>(e => console.log(e));
  return locations;
}

export async function getLocationByName(name: string) {
  const location = await locationModel.findOne({ name }).catch<Location>(e => console.log(e));
  return location;
}

export function getDistanceBetween(point1: Coordinate, point2: Coordinate): number {
  const earthRadius = 6371e3;
  const angle1 = point1.lat * Math.PI / 180;
  const angle2 = point2.lat * Math.PI / 180;
  const deltaLat = (point2.lat - point1.lat) * Math.PI / 180;
  const deltaLon = (point2.lon - point1.lon) * Math.PI / 180;
  const a = 
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(angle1) * Math.cos(angle2) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
}