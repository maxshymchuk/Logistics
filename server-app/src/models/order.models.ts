import * as mongoose from 'mongoose';

import { orderSchema } from '../schemas/order.schemas';
import { Cargo } from './cargo.models';
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
  isPaid: boolean;
  takenTime: Date;
}

export type UserOrder = {
  from: Location;
  to: Location;
  who: string;
  cargo: Cargo[];
  message: string;
};

export type UserOrderInput = {
  from: string;
  to: string;
  cargo: Cargo[];
  message: string;
};

export interface OrderMongo extends mongoose.Document, Order {}
