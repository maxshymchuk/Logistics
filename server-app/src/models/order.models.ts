import * as mongoose from 'mongoose';

import { orderSchema } from '../schemas/order.schemas';
import { Location } from './location.models';
import { Route } from './route.models';
import { Track } from './track.models';

export const orderModel = mongoose.model<OrderMongo>("orders", orderSchema);

export enum OrderStatus {
  Taken = "Taken",
  Completed = "Completed",
  Canceled = "Canceled"
}

export interface Order {
  message: string;
  tracks: Track[];
  username: string;
  price: number;
  status: OrderStatus;
  routes: Route[];
  trackNumber: string;
}

export type UserOrder = {
  from: Location;
  to: Location;
  who: string;
  cargos: string[];
  message: string;
};

export type UserOrderInput = {
  from: string;
  to: string;
  cargos: string[];
  message: string;
};

export interface OrderMongo extends mongoose.Document, Order {}
