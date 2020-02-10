import * as mongoose from 'mongoose';

import { Location, LocationMongo } from "./locations.models";
import { locationSchema } from './locations.schemas';

const locationModel = mongoose.model<LocationMongo>('locations', locationSchema);

export async function getLocations(): Promise<Location[]> {
  const locations = await locationModel.find();
  return locations;
}