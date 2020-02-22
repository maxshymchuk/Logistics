import * as mongoose from 'mongoose';
import { CallbackType } from '../models';
import { Location, LocationMongo } from './locations.models';
import { locationSchema } from './locations.schemas';

const locationModel = mongoose.model<LocationMongo>('locations', locationSchema);

export function getLocations(callback: CallbackType<Location[]>) {
  locationModel.find((err, locations) => callback(err, locations));
}

export function getLocationByName(name: string, callback: CallbackType<Location>) {
  locationModel.findOne({ name }, (err, location) => callback(err, location));
}
