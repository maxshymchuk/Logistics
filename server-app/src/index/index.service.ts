import * as mongoose from 'mongoose';
import CONSTS from '../const';
import { OrderMongo } from '../orders/orders.models';
import { orderSchema } from '../orders/orders.schemas';
import { updateOrders } from '../orders/orders.service';
import { VehicleMongo } from '../vehicles/vehicles.models';
import { vehicleSchema } from '../vehicles/vehicles.schemas';

const vehicleModel = mongoose.model<VehicleMongo>('vehicles', vehicleSchema);
const orderModel = mongoose.model<OrderMongo>('orders', orderSchema);

function moveDate(current: Date, hours: number) {
  return new Date(current.getTime() + hours * CONSTS.HOUR_MILLISEC);
}

export async function moveTimeOn(days: number) {
  const arr = new Array(Math.abs(days));
  const dir = days < 0 ? -1 : 1;
  const vehicles: VehicleMongo[] = await vehicleModel.find();
  const orders: OrderMongo[] = await orderModel.find();
  for (let i of arr) {
    await vehicles.forEach(async vehicle => {
      vehicle.arrivalDate = moveDate(vehicle.arrivalDate, CONSTS.HOURS_PER_DAY * dir);
      await vehicleModel.updateOne({ _id: vehicle._id }, vehicle);
    });
    await orders.forEach(async order => {
      order.tracks.forEach(track => {
        track.departureDate = moveDate(track.departureDate, CONSTS.HOURS_PER_DAY * dir);
        track.arrivalDate = moveDate(track.arrivalDate, CONSTS.HOURS_PER_DAY * dir);
        track.route.departureDate = moveDate(track.route.departureDate, CONSTS.HOURS_PER_DAY * dir);
      });
      order.routes.forEach(route => {
        route.departureDate = moveDate(route.departureDate, CONSTS.HOURS_PER_DAY * dir);
      });
      await orderModel.updateOne({ _id: order._id }, order);
    });

    await updateOrders();
  }

  return days >= 0 ? `Plus ${Math.abs(days)} day(s)` : `Minus ${Math.abs(days)} day(s)`;
}
