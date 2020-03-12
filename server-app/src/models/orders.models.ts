import * as mongoose from "mongoose";
import { Location } from "./locations.models";
import { Track } from "./tracks.models";
import { Route } from "./routes.models";
import { orderSchema } from "../schemas/orders.schemas";

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
