import * as mongoose from 'mongoose';

import { VehicleMongo } from '../vehicles/vehicles.models';
import { OrderMongo } from '../orders/orders.models';
import { vehicleSchema } from '../vehicles/vehicles.schemas';
import { orderSchema } from '../orders/orders.schemas';

const vehicleModel = mongoose.model<VehicleMongo>('vehicles', vehicleSchema);
const orderModel = mongoose.model<OrderMongo>('orders', orderSchema);

function moveDate(current: Date, hours: number): Date {
  return new Date(current.getTime() + hours * 3600000);
}

export async function moveTimeOn(days: number): Promise<string> {
  const vehicles: VehicleMongo[] = await vehicleModel.find();
  const orders: OrderMongo[] = await orderModel.find();
  vehicles.forEach(async (vehicle) => {
    vehicle.date = moveDate(vehicle.date, 24 * days);
    await vehicleModel.updateOne({ _id: vehicle._id }, vehicle);
  })
  orders.forEach(async (order) => {
    order.tracks.forEach(track => {
      track.departureDate = moveDate(track.departureDate, 24 * days);
      track.arrivalDate = moveDate(track.arrivalDate, 24 * days);
      track.route.departureDate = moveDate(track.route.departureDate, 24 * days);
    })
    order.routes.forEach(route => {
      route.departureDate = moveDate(route.departureDate, 24 * days);
    })
    await orderModel.updateOne({ _id: order._id }, order);
  })
  return days >= 0 ? `Plus ${Math.abs(days)} day(s)` : `Minus ${Math.abs(days)} day(s)`;
}