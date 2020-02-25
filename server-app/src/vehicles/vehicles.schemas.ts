import * as mongoose from 'mongoose';
import { locationSchema } from '../locations/locations.schemas';

// Vehicle Model
export const vehicleSchema = new mongoose.Schema({
  destination: locationSchema,
  arrivalDate: Date,
  type: String
})