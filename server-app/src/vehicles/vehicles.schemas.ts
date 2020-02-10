import * as mongoose from 'mongoose';
import { locationSchema } from '../locations/locations.schemas';
import { VehicleType } from './vehicles.models';

// Vehicle Model
export const vehicleSchema = new mongoose.Schema({
  destination: locationSchema,
  date: Date,
  type: String
})