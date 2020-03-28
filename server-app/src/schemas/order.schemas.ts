import * as mongoose from 'mongoose';

import { locationSchema } from './location.schemas';
import { vehicleSchema } from './vehicle.schemas';

// Route Model
export const routeSchema = new mongoose.Schema({
  startLocation: locationSchema,
  endLocation: locationSchema,
  cargos: [String],
  departureDate: Date,
  vehicle: vehicleSchema
});

// Order Model
export const orderSchema = new mongoose.Schema({
  message: String,
  tracks: [
    {
      route: routeSchema,
      status: String,
      departureDate: Date,
      arrivalDate: Date
    }
  ],
  username: String,
  price: Number,
  status: String,
  routes: [routeSchema],
  trackNumber: String
});
