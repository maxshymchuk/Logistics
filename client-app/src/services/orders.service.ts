import * as qs from 'qs';
import axios from 'axios';
import { OrderUser, OrderUserInput } from '../models/orders.models';

export async function getOrderPrice(order: OrderUserInput) {
  const params = qs.stringify(order);
  const price = (await axios.get(`orders/price/${params}`)).data;
  return price;
}

export async function getOrderByTrackNumber(trackNumber: string) {
  const order = (
    await axios.get(`orders/track/${trackNumber}`).catch<any>(() => {
      throw new Error('Track not found')
    })
  ).data;
  return order;
}

export async function createOrder(order: OrderUserInput) {
  const params: OrderUser = {
    from: order.from,
    to: order.to,
    vehicle: order.vehicle,
    who: 'noname',
    cargos: order.cargos.split(','),
    message: order.message
  };
  const res = await axios.post('orders', params);
  return res.data;
}
