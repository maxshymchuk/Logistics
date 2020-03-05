import CONSTS from '../../const';
import { updateOrders } from '../orders/orders.service';
import { vehicleModel } from '../../models/vehicles.models';
import { orderModel } from '../../models/orders.models';
import { moveDate } from '../../utils';

export async function moveTimeOn(days: number) {
  const interval = Math.sign(days) * CONSTS.HOURS_PER_DAY;
  const vehicles = await vehicleModel.find();
  const orders = await orderModel.find();
  for (let i = 0; i < Math.abs(days); i++) {
    for (let vehicle of vehicles) {
      vehicle.arrivalDate = moveDate(vehicle.arrivalDate, interval);
      await vehicleModel.updateOne({ _id: vehicle._id }, vehicle);
    }
    for (let order of orders) {
      for (let track of order.tracks) {
        track.departureDate = moveDate(track.departureDate, interval);
        track.arrivalDate = moveDate(track.arrivalDate, interval);
        track.route.departureDate = moveDate(track.route.departureDate, interval);
      }
      for (let route of order.routes) {
        route.departureDate = moveDate(route.departureDate, interval);
      }
      await orderModel.updateOne({ _id: order._id }, order);
    }
    await updateOrders();
  }
  return days >= 0 ? `Plus ${Math.abs(days)} day(s)` : `Minus ${Math.abs(days)} day(s)`;
}
