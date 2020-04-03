import CONSTS from '../../const';
import { errorResponse, successResponse } from '../../helpers/messages';
import { orderModel } from '../../models/order.models';
import { vehicleModel } from '../../models/vehicle.models';
import { moveDate } from '../../utils';
import { updateOrders } from '../orders/orders.service';

async function moveVehiclesTimeOn(interval: number) {
  const vehicles = await vehicleModel.find();
  for (let vehicle of vehicles) {
    vehicle.arrivalDate = moveDate(vehicle.arrivalDate, interval);
    await vehicleModel.updateOne({ _id: vehicle._id }, vehicle);
  }
}

async function moveOrdersTimeOn(interval: number) {
  const orders = await orderModel.find();
  for (let order of orders) {
    for (let track of order.tracks) {
      track.departureDate = moveDate(track.departureDate, interval);
      track.arrivalDate = moveDate(track.arrivalDate, interval);
      track.route.departureDate = moveDate(
        track.route.departureDate,
        interval
      );
    }
    for (let route of order.routes) {
      route.departureDate = moveDate(route.departureDate, interval);
    }
    await orderModel.updateOne({ _id: order._id }, order);
  }
}

export async function moveTimeOn(days: number) {
  try {
    const interval = Math.sign(days) * CONSTS.HOURS_PER_DAY;
    for (let i = 0; i < Math.abs(days); i++) {
      await moveVehiclesTimeOn(interval);
      await moveOrdersTimeOn(interval);
      await updateOrders();
    }
    const result = days >= 0
      ? `Plus ${Math.abs(days)} day(s)`
      : `Minus ${Math.abs(days)} day(s)`
    return successResponse(result);
  } catch (err) {
    return errorResponse(`Error while moving time (${err})`);
  }
}
