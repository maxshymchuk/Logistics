import * as mongoose from 'mongoose';

import { routeSchema } from '../schemas';
import { OrderStatus, TrackStatus } from './orders.models';

// Order Model
export const orderSchema = new mongoose.Schema({
  message: String,
  tracks: [{
    route: routeSchema,
    status: {
      type: String,
      default: TrackStatus.Pending
    },
    departureDate: Date,
    arrivalDate: Date
  }],
  userLogin: String,
  price: Number,
  status: {
    type: String,
    default: OrderStatus.Taken
  },
  routes: [routeSchema],
  trackNumber: String
})