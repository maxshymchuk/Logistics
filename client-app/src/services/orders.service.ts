import axios from 'axios';
import * as qs from 'qs';
import { InputState } from '../pages/Orders/Order';
import { Order } from '../models/orders.models';

export async function getOrderPrice(order: InputState) {
  const params = qs.stringify(order);
  const price = (await axios.get(`orders/price/${params}`)).data;
  return price;
}

export async function createOrder(order: InputState): Promise<string> {
  const params: Order = {
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
