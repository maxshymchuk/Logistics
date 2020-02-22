import * as mongoose from 'mongoose';
import { Location, LocationMongo } from './locations.models';
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
