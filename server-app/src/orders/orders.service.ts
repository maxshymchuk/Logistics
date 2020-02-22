import * as mongoose from 'mongoose';
import * as qs from 'qs';
import { cap, getDistanceBetween } from '../utils';
import { ErrorType } from '../models';
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
  };
}

function getTrackNumber(): string {
  return 'xxxx-xxxx'.replace(/[x]/g, () => ((Math.random() * 36) | 0).toString(36));
}

function getArrivalDate(current: Date, hours: number) {
  return new Date(current.getTime() + hours * 3600000);
}

async function findOrderById(_id: string) {
  const order = await orderModel.findOne({ _id }).catch<Order>(e => console.log(e));
  return order;
}

function computePrice(distance: number, vehicle: VehicleType): number {
  const METERS_PER_KILOMETER = 1000;
  return +((distance * getVehiclePriceRatio(vehicle)) / METERS_PER_KILOMETER).toFixed(2);
}

export async function getOrders() {
  const orders = await orderModel.find().catch<Order[]>(e => console.log(e));
  return orders;
}

export async function getOrderById(id: string) {
  const order = await findOrderById(id);
  return order;
}

export async function getOrderByTrackNumber(trackNumber: string) {
  const order = await orderModel.findOne({ trackNumber }).catch<Order>(e => console.log(e));
  return order;
}

export async function getOrderUserLogin(id: string) {
  const userLogin = (await findOrderById(id))?.userLogin;
  return userLogin;
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

  const trackNumber = getTrackNumber();

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
    trackNumber: trackNumber
  };
  await orderModel.create(order, (err: Error) => err && console.log(err));
  return trackNumber;
}

export async function deleteOrderById(_id: string) {
  const tempOrder = await findOrderById(_id);
  if (tempOrder) {
    await orderModel.deleteOne({ _id }).catch(e => console.log(e));
    return `Order ${_id} deleted`;
  } else {
    return 'Order ID is not valid';
  }
}

export async function updateOrder(order: OrderMongo) {
  const tempOrder = await findOrderById(order._id);
  if (tempOrder) {
    await orderModel.updateOne({ _id: order._id }, order).catch(e => console.log(e));
    return 'Order has been updated';
  } else {
    return 'Order not found';
  }
}
