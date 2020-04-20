import * as mongoose from 'mongoose';

import { locationSchema } from './location.schemas';

// Vehicle Model
export const vehicleSchema = new mongoose.Schema({
  destination: locationSchema,
  arrivalDate: Date,
  type: String
});
