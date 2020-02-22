import * as mongoose from 'mongoose';
import * as qs from 'qs';
import { CallbackType } from '../models';
import { cap, getDistanceBetween } from '../utils';
import { getLocationByName } from '../locations/locations.service';
import { getNearestVehicle, getVehiclePriceRatio } from '../vehicles/vehicles.service';
import { Location, LocationMongo } from '../locations/locations.models';
import { locationSchema } from '../locations/locations.schemas';
import { Order, OrderMongo, OrderStatus, UserOrder, UserOrderInput } from './orders.models';
import { orderSchema } from './orders.schemas';
import { Vehicle, VehicleSpeed, VehicleType } from '../vehicles/vehicles.models';

const orderModel = mongoose.model<OrderMongo>('orders', orderSchema);
const locationModel = mongoose.model<LocationMongo>('locations', locationSchema);

function getOrderStatus(name: string) {
  return OrderStatus[cap(name) as OrderStatus];
}

async function getUserOrderFromInput(userOrderInput: UserOrderInput, callback: CallbackType<UserOrder>) {
  // getLocationByName('Gomel', (err, location) => {
  //   console.log(location);
  // });
  const from: Location = await locationModel.findOne({ name: userOrderInput.from });
  const to: Location = await locationModel.findOne({ name: userOrderInput.to });
  callback('asd', {
    from: from,
    to: to,
    who: userOrderInput.who,
    vehicle: userOrderInput.vehicle,
    cargos: userOrderInput.cargos,
    message: userOrderInput.message
  });
}

function getTrackNumber(): string {
  return 'xxxx-xxxx'.replace(/[x]/g, () => ((Math.random() * 36) | 0).toString(36));
}

function getArrivalDate(current: Date, hours: number) {
  return new Date(current.getTime() + hours * 3600000);
}

function computePrice(distance: number, vehicle: VehicleType): number {
  const METERS_PER_KILOMETER = 1000;
  return +((distance * getVehiclePriceRatio(vehicle)) / METERS_PER_KILOMETER).toFixed(2);
}

export function getOrders(callback: CallbackType<Order[]>) {
  orderModel.find((err, orders) => callback(err, orders));
}

export function getOrderById(id: string, callback: CallbackType<Order>) {
  orderModel.findOne({ _id: id }, (err, order) => callback(err, order));
}

export function getOrderByTrackNumber(trackNumber: string, callback: CallbackType<Order>) {
  orderModel.findOne({ trackNumber }, (err, order) => callback(err, order));
}

export function getOrderUserLogin(id: string, callback: CallbackType<string>) {
  orderModel.findOne({ _id: id }, (err, order) => callback(err, order.userLogin));
}

export function getOrderPrice(orderParams: string, callback: CallbackType<string>) {
  const userOrderInput: UserOrderInput = qs.parse(orderParams);
  getUserOrderFromInput(userOrderInput, (err, userOrder) => {
    const distance = getDistanceBetween(userOrder.from.coordinates, userOrder.to.coordinates);
    const price = computePrice(distance, userOrder.vehicle).toString();
    callback(err, price);
  });
}

export async function addOrder(userOrderInput: UserOrderInput) {
  // const userOrder = await getUserOrderFromInput(userOrderInput);
  // const distance = getDistanceBetween(userOrder.from.coordinates, userOrder.to.coordinates);
  // const price = computePrice(distance, userOrder.vehicle);
  // const vehicle: Vehicle = await getNearestVehicle(userOrder.from, userOrder.vehicle);
  // const departureDate = vehicle.date; // + time for loading, depends on weight and number of cargos
  // const arrivalDate = getArrivalDate(departureDate, distance / VehicleSpeed[userOrder.vehicle]);
  // vehicle.destination = userOrder.to;
  // vehicle.date = arrivalDate;
  // const trackNumber = getTrackNumber();
  // const order: Order = {
  //   message: userOrder.message,
  //   tracks: [],
  //   userLogin: userOrder.who,
  //   price: +price,
  //   status: getOrderStatus('Taken'),
  //   routes: [
  //     {
  //       startLocation: userOrder.from,
  //       endLocation: userOrder.to,
  //       cargos: userOrder.cargos,
  //       departureDate: departureDate,
  //       vehicle: vehicle
  //     }
  //   ],
  //   trackNumber: trackNumber
  // };
  // await orderModel.create(order, (err: Error) => err && console.log(err));
  // return trackNumber;
}

export async function updateOrder(order: OrderMongo): Promise<string | void> {
  // if (isValidId(order._id)) {
  //   await orderModel.updateOne({ _id: order._id }, order);
  //   return 'Order has been updated';
  // } else {
  //   return 'Order ID is not valid';
  // }
}
