import * as mongoose from 'mongoose';

import { CustomResponse, Coordinate, Location } from "../models";
import { Order, VehicleType, VehiclePriceRatio, Vehicle, VehicleSpeed } from "./orders.models";
import { orderSchema } from './orders.schemas';
import { vehicleSchema } from '../schemas';

const orderModel = mongoose.model<Order>('orders', orderSchema);
const vehicleModel = mongoose.model<Vehicle>('vehicles', vehicleSchema);

function getDistanceBetween(point1: Coordinate, point2: Coordinate): number {
  const earthRadius = 6371e3;
  const angle1 = point1.lat * Math.PI / 180;
  const angle2 = point2.lat * Math.PI / 180;
  const deltaLat = (point2.lat - point1.lat) * Math.PI / 180;
  const deltaLon = (point2.lon - point1.lon) * Math.PI / 180;
  const a = 
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(angle1) * Math.cos(angle2) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
}

function computePrice(distance: number, vehicle: VehicleType): number {
  return distance * VehiclePriceRatio[vehicle];
}

async function getNearestVehicle(currentLocation: Location) {
  const arr: {id: number, travelTime: number}[] = [];
  const ids = (await vehicleModel.find()).map((i: mongoose.Document) => i._id);
  for (let i = 0; i < ids.length; i++) {
    const vehicle = await vehicleModel.findOne({_id: ids[i]});
    const dist = getDistanceBetween(currentLocation.coordinates, vehicle.destination.coordinates);
    arr.push({
      id: ids[i],
      travelTime: dist / VehicleSpeed[vehicle.type]
    })
  }
  arr.sort((a, b) => a.travelTime - b.travelTime)
  console.log(arr)
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

async function validatorOrderId(id: string): Promise<CustomResponse> {
  return await findOrderById(id) ? {
    status: {
      content: 'Ok',
      code: 200,
    },
    isFound: true
  } : {
    status: {
      content: 'Order not found',
      code: 404,
    },
    isFound: false
  }
}

export async function getOrders(): Promise<CustomResponse['status']> {
  const gomel = {
    name: 'Gomel',
    coordinates: {
      lat: 52.445278,
      lon: 30.984167
    }
  }
  getNearestVehicle(gomel)
  return {
    content: await orderModel.find().exec(),
    code: 200
  }
}

export async function getOrderById(id: string): Promise<CustomResponse['status']> {
  const validator: CustomResponse = await validatorOrderId(id);
  return !validator.isFound ? validator.status : {
    content: await findOrderById(id),
    code: 200
  }
}

export async function getOrderUserId(id: string): Promise<CustomResponse['status']> {
  const validator = await validatorOrderId(id);
  return !validator.isFound ? validator.status : {
    content: (await findOrderById(id)).userId,
    code: 200
  }
}

export async function addOrder(order: Order): Promise<CustomResponse['status']> {
  orderModel.create(order, (err: Error) => err && console.log(err));
  return {
    content: 'Order added',
    code: 201
  }
}

export async function deleteOrderById(id: string): Promise<CustomResponse['status']> {
  const validator = await validatorOrderId(id);
  validator.isFound && orderModel.deleteOne({ _id: id }).exec();
  return !validator.isFound ? validator.status : {
    content: 'Order deleted',
    code: 200
  }
}

export async function updateOrder(order: Order) {
  const validator = await validatorOrderId(order._id);
  validator.isFound && orderModel.updateOne({ _id: order._id }, order).exec();
  return !validator.isFound ? validator.status : {
    content: await findOrderById(order._id),
    code: 200
  }
}