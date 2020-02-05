import * as mongoose from 'mongoose';

import { routeSchema } from '../schemas';
import { TrackStatus } from './orders.models';

// Order Model
export const orderSchema = new mongoose.Schema({
  description: String,
  tracks: [{
    route: routeSchema,
    status: {
      type: String,
      default: TrackStatus.Pending
    },
    departureDate: Date,
    arrivalDate: Date
  }],
  userId: String,
  price: Number,
  status: {
    type: Boolean,
    default: false
  },
  routes: [routeSchema]
})