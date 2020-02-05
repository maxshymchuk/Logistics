import * as mongoose from 'mongoose';

import { routeSchema } from '../schemas';

// Order Model
export const orderSchema = new mongoose.Schema({
  description: String,
  tracks: [{
    route: routeSchema,
    status: String,
    departureDate: Date,
    arrivalDate: Date
  }],
  userId: String,
  price: Number,
  status: Boolean,
  routes: [routeSchema]
})