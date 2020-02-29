import * as mongoose from 'mongoose';
import { locationSchema } from '../locations/locations.schemas';
import { OrderStatus, TrackStatus } from './orders.models';
import { vehicleSchema } from '../vehicles/vehicles.schemas';


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
      status: {
        type: String,
        default: TrackStatus.Pending
      },
      departureDate: Date,
      arrivalDate: Date
    }
  ],
  userLogin: String,
  price: Number,
  status: {
    type: String,
    default: OrderStatus.Taken
  },
  routes: [routeSchema],
  trackNumber: String
});
