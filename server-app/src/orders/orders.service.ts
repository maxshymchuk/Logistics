import * as mongoose from 'mongoose';
import * as qs from 'qs';
import CONSTS from '../const';
import { Order, OrderMongo, OrderStatus, Route, Track, TrackStatus, UserOrder, UserOrderInput } from './orders.models';
import { orderSchema } from './orders.schemas';
import { assignVehicle, getNearestVehicle, getVehiclePriceRatio, getVehicleSpeed } from '../vehicles/vehicles.service';
import { cap } from '../utils';
import { getDistanceBetween } from '../locations/locations.service';
import { Location, LocationMongo } from '../locations/locations.models';
import { locationSchema } from '../locations/locations.schemas';
import { Vehicle, VehicleSpeed, VehicleType } from '../vehicles/vehicles.models';

const orderModel = mongoose.model<OrderMongo>('orders', orderSchema);
const locationModel = mongoose.model<LocationMongo>('locations', locationSchema);

function getOrderStatus(name: string) {
  return OrderStatus[cap(name) as OrderStatus];
}

function getTrackStatus(name: string) {
  return TrackStatus[cap(name) as TrackStatus];
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

async function findOrderById(_id: string) {
  const order = await orderModel.findOne({ _id }).catch<Order>(e => console.log(e));
  return order;
}

function computePrice(distance: number, vehicle: VehicleType): number {
  return +((distance * getVehiclePriceRatio(vehicle)) / CONSTS.METERS_PER_KILOMETER).toFixed(2);
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

function createTrack(route: Route, vehicle: Vehicle) {
  const today = new Date();
  const status = route.departureDate <= today ? getTrackStatus('Transit') : getTrackStatus('Pending');
  return {
    status: status,
    route: route,
    departureDate: route.departureDate,
    arrivalDate: vehicle.arrivalDate
  } as Track;
}

export async function updateOrdersStatus() {
  const today = new Date();
  const orders = await orderModel.find().catch<Order[]>(e => console.log(e));

  orders.forEach(order => {
    order.routes.forEach((route, index) => {
      if (route.departureDate <= today) {
        order.tracks.filter(track => track.route == route)
        // order.tracks.push({
        //   route: route,
        //   status: getTrackStatus('Completed'),
        //   departureDate: ,
        //   arrivalDate: 
        // })
      }
    })
  })
}

export async function addOrder(userOrderInput: UserOrderInput) {
  const userOrder = await getUserOrderFromInput(userOrderInput);
  const nearestVehicle = await getNearestVehicle(userOrder.vehicle, userOrder.from, new Date());
  const assignedVehicle = assignVehicle(nearestVehicle, userOrder.to);
  
  const price = 666;//computePrice(distance, userOrder.vehicle);

  const routes: Route[] = [
    {
      startLocation: userOrder.from,
      endLocation: userOrder.to,
      cargos: userOrder.cargos,
      departureDate: nearestVehicle.arrivalDate,
      vehicle: assignedVehicle
    },
    {
      startLocation: userOrder.to,
      endLocation: userOrder.from,
      cargos: userOrder.cargos,
      departureDate: nearestVehicle.arrivalDate,
      vehicle: assignedVehicle
    }
  ]

  const trackNumber = getTrackNumber();
  const order: Order = {
    message: userOrder.message,
    tracks: [createTrack(routes[0], assignedVehicle)],
    userLogin: userOrder.who,
    price: +price,
    status: getOrderStatus('Taken'),
    routes: routes,
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
    return `Order ${order._id} updated`;
  } else {
    return 'Order not found';
  }
}
