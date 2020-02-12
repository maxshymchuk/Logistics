import * as mongoose from 'mongoose';
import * as qs from 'qs';

import { Order, UserOrder, OrderMongo, UserOrderInput, OrderStatus } from "./orders.models";
import { orderSchema } from './orders.schemas';
import { getNearestVehicle, getVehiclePriceRatio } from '../vehicles/vehicles.service';
import { Vehicle, VehicleSpeed, VehicleType } from '../vehicles/vehicles.models';
import { getDistanceBetween, cap } from '../utils';
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

function getTrackNumber(): string {
  return 'xxxx-xxxx'.replace(/[x]/g, () => (Math.random() * 36 | 0).toString(36));
}

function getArrivalDate(current: Date, hours: number) {
  return new Date(current.getTime() + hours * 3600000);
}

async function findOrderById(id: string): Promise<Order> {
  let result: Order;
  try {
    result = await orderModel.findOne({ _id: id });
  } catch (e) {
    console.log('Invalid id');
  }
  return result;
}

function computePrice(distance: number, vehicle: VehicleType): number {
  return distance * getVehiclePriceRatio(vehicle);
}

async function isValidId(id: string): Promise<boolean> {
  const order = await findOrderById(id);
  return !!order;
}

export async function getOrders(): Promise<Order[]> {
  const orders = await orderModel.find();
  return orders;
}

export async function getOrderById(id: string): Promise<Order | string> {
  if (isValidId(id)) {
    const order = await findOrderById(id);
    return order;
  } else {
    return 'Order ID is not valid'
  }
}

export async function getOrderUserLogin(id: string): Promise<string> {
  if (isValidId(id)) {
    const userLogin = (await findOrderById(id)).userLogin;
    return userLogin;
  } else {
    return 'Order ID is not valid'
  }
}

export async function getOrderPrice(orderParams: string): Promise<string> {
  const userOrderInput: UserOrderInput = qs.parse(orderParams);
  const userOrder = await getUserOrderFromInput(userOrderInput);
  const distance = getDistanceBetween(userOrder.from.coordinates, userOrder.to.coordinates);
  const price = computePrice(distance, userOrder.vehicle);
  return price.toString();
}

export async function addOrder(userOrderInput: UserOrderInput): Promise<string> {
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
    ],
    trackNumber: getTrackNumber()
  }
  await orderModel.create(order, (err: Error) => err && console.log(err));
  return 'Order has been added';
}

export async function updateOrder(order: OrderMongo): Promise<string | void> {
  if (isValidId(order._id)) {
    await orderModel.updateOne({ _id: order._id }, order);
    return 'Order has been updated';
  } else {
    return 'Order ID is not valid'
  }
}