import * as mongoose from 'mongoose';
import { locationSchema } from './locations.schemas';
import { vehicleSchema } from './vehicles.schemas';

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
  userLogin: String,
  price: Number,
  status: String,
  routes: [routeSchema],
  trackNumber: String
});
