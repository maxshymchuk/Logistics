import * as mongoose from 'mongoose';
import * as qs from 'qs';

import { Order, UserOrder, OrderMongo, UserOrderInput, OrderStatus } from "./orders.models";
import { orderSchema } from './orders.schemas';
import { getNearestVehicle, getVehiclePriceRatio } from '../vehicles/vehicles.service';
import { Vehicle, VehicleSpeed } from '../vehicles/vehicles.models';
import { getDistanceBetween, computePrice, cap } from '../functions';
import { locationSchema } from '../locations/locations.schemas';
import { LocationMongo, Location } from '../locations/locations.models';

const orderModel = mongoose.model<OrderMongo>('orders', orderSchema);
const locationModel = mongoose.model<LocationMongo>('locations', locationSchema);

function getOrderStatus(name: string) {
  return OrderStatus[cap(name) as OrderStatus];
}

async function getUserOrderFromInput(userOrderInput: UserOrderInput): Promise<UserOrder> {
  const from: Location = await locationModel.findOne({ name: userOrderInput.from });
  const to: Location = await locationModel.findOne({ name: userOrderInput.to });
  return {
    from: from, 
    to: to,
    who: userOrderInput.who,
    vehicle: userOrderInput.vehicle,
    cargos: userOrderInput.cargos,
    message: userOrderInput.message
  }
}

function getArrivalDate(current: Date, hours: number) {
  return new Date(current.getTime() + hours * 3600000);
}

async function findOrderById(id: string): Promise<Order> {
  let result: Promise<Order>;
  try {
    result = orderModel.findOne({ _id: id }).exec();
  } catch (e) {
    console.log('Invalid id');
  }
  return result;
}

async function isValidId(id: string): Promise<boolean> {
  const order = await findOrderById(id);
  return !!order;
}

export async function getOrders(): Promise<Order[]> {
  return orderModel.find().exec();
}

export async function getOrderById(id: string): Promise<Order | void> {
  if (isValidId(id)) {
    const order = await findOrderById(id);
    return order;
  }
}

export async function getOrderUserId(id: string): Promise<string | void> {
  if (isValidId(id)) {
    const userId = (await findOrderById(id)).userLogin;
    return userId;
  }
}

export async function getOrderPrice(orderParams: string): Promise<string> {
  const userOrderInput: UserOrderInput = qs.parse(orderParams);
  const userOrder = await getUserOrderFromInput(userOrderInput);
  const distance = getDistanceBetween(userOrder.from.coordinates, userOrder.to.coordinates);
  const price = computePrice(distance, userOrder.vehicle);
  return price.toString();
}

export async function addOrder(userOrderInput: UserOrderInput): Promise<string | void> {
  const userOrder = await getUserOrderFromInput(userOrderInput);
  const distance = getDistanceBetween(userOrder.from.coordinates, userOrder.to.coordinates);
  const price = computePrice(distance, userOrder.vehicle);
  
  const vehicle: Vehicle = await getNearestVehicle(userOrder.from, userOrder.vehicle);
  const departureDate = vehicle.date; // + time for loading, depends on weight and number of cargos
  const arrivalDate = getArrivalDate(departureDate, distance / VehicleSpeed[userOrder.vehicle]);
  
  vehicle.destination = userOrder.to;
  vehicle.date = arrivalDate;
  
  const order: Order = {
    message: userOrder.message,
    tracks: [],
    userLogin: userOrder.who,
    price: +price,
    status: getOrderStatus('Taken'),
    routes: [
      {
        startLocation: userOrder.from,
        endLocation: userOrder.to,
        cargos: userOrder.cargos,
        departureDate: departureDate,
        vehicle: vehicle
      }
    ]
  }
  await orderModel.create(order, (err: Error) => err && console.log(err));
  return 'Order has been added';
}

export async function updateOrder(order: OrderMongo): Promise<string | void> {
  if (isValidId(order._id)) {
    orderModel.updateOne({ _id: order._id }, order).exec();
    return 'Order has been updated';
  }
}