import * as mongoose from 'mongoose';
import * as qs from 'qs';
import CONSTS from '../const';
import { assignVehicle, getNearestVehicle } from '../vehicles/vehicles.service';
import { cap } from '../utils';
import { getDistanceBetween, getLocationByName } from '../locations/locations.service';
import { Location, LocationMongo } from '../locations/locations.models';
import { locationSchema } from '../locations/locations.schemas';
import { Order, OrderMongo, OrderStatus, Route, Track, TrackStatus, UserOrder, UserOrderInput } from './orders.models';
import { orderSchema } from './orders.schemas';
import { Vehicle, VehiclePriceRatio, VehicleSpeed, VehicleType } from '../vehicles/vehicles.models';

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

function computePrice(distance: number, vehicleType: VehicleType): number {
  return +((distance * VehiclePriceRatio[vehicleType]) / CONSTS.METERS_PER_KILOMETER).toFixed(2);
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

export async function getOrderPrice(orderParams: string) {
  const userOrderInput: UserOrderInput = qs.parse(orderParams);
  const userOrder = await getUserOrderFromInput(userOrderInput);
  const distance = getDistanceBetween(userOrder.from.coordinates, userOrder.to.coordinates);
  // const price = computePrice(distance, userOrder.vehicle);
  return '123';
  // return price.toString();
}

function createTrack(route: Route, vehicle: Vehicle) {
  const today = new Date();
  const status = route.departureDate <= today ? TrackStatus.Transit : TrackStatus.Pending;
  const track: Track = {
    status: status,
    route: route,
    departureDate: route.departureDate,
    arrivalDate: vehicle.arrivalDate
  };
  return track;
}

export async function updateOrdersStatus() {
  const today = new Date();
  const orders = await orderModel.find({ status: OrderStatus.Taken }).catch<Order[]>(e => console.log(e));

  await orders.forEach(async (order: OrderMongo) => {
    const routesLength = order.routes.length;
    const lastTrack = order.tracks[order.tracks.length - 1];
    if (lastTrack.departureDate === today) {
      lastTrack.status = TrackStatus.Transit;
    } else if (lastTrack.departureDate > today) {
      lastTrack.status = TrackStatus.Completed;
      if (order.tracks.length === routesLength) {
        order.status = OrderStatus.Completed;
      } else {
        const route = order.routes[order.tracks.length];
        const newTrack = createTrack(route, route.vehicle);
        order.tracks.push(newTrack);
      }
    }
    await orderModel.updateOne({ _id: order._id }, order);
  });
}

export async function addOrder(userOrderInput: UserOrderInput) {
  userOrderInput = {
    from: 'Gomel',
    to: 'Minsk',
    who: 'user',
    vehicle: VehicleType.Car,
    cargos: [''],
    message: ''
  };

  const userOrder = await getUserOrderFromInput(userOrderInput);
  // const nearestVehicle = await getNearestVehicle(userOrder.vehicle, userOrder.from, new Date());
  // const assignedVehicle = assignVehicle(nearestVehicle, userOrder.to);

  const price = 666; //computePrice(distance, userOrder.vehicle);

  // Gomel -> Zhlobin -> Bobruisk -> Minsk

  const lGomel = await getLocationByName('Gomel');
  const lZhlobin = await getLocationByName('Zhlobin');
  const lBobruisk = await getLocationByName('Bobruisk');
  const lMinsk = await getLocationByName('Minsk');

  const nearestVehicle1 = await getNearestVehicle(userOrder.vehicle, lGomel, new Date());
  const assignedVehicle1 = await assignVehicle(nearestVehicle1, lZhlobin);

  const nearestVehicle2 = await getNearestVehicle(userOrder.vehicle, lZhlobin, assignedVehicle1.arrivalDate);
  const assignedVehicle2 = await assignVehicle(nearestVehicle2, lBobruisk);

  const nearestVehicle3 = await getNearestVehicle(userOrder.vehicle, lBobruisk, assignedVehicle2.arrivalDate);
  const assignedVehicle3 = await assignVehicle(nearestVehicle3, lMinsk);

  const routes: Route[] = [
    {
      startLocation: lGomel,
      endLocation: lZhlobin,
      cargos: userOrder.cargos,
      departureDate: nearestVehicle1.arrivalDate,
      vehicle: assignedVehicle1
    },
    {
      startLocation: lZhlobin,
      endLocation: lBobruisk,
      cargos: userOrder.cargos,
      departureDate: nearestVehicle2.arrivalDate,
      vehicle: assignedVehicle2
    },
    {
      startLocation: lBobruisk,
      endLocation: lMinsk,
      cargos: userOrder.cargos,
      departureDate: nearestVehicle3.arrivalDate,
      vehicle: assignedVehicle3
    }
  ];

  const trackNumber = getTrackNumber();
  const order: Order = {
    message: userOrder.message,
    tracks: [createTrack(routes[0], assignedVehicle1)],
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
