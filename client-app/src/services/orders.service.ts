import * as qs from 'qs';
import axios from 'axios';
import { OrderUser } from '../models/orders.models';
import { UserPath } from '../models/locations.models';

export async function getOrderPaths(order: OrderUser) {
  const params = qs.stringify(order);
  const paths: UserPath[] = (await axios.get(`orders/paths/${params}`)).data;
  return paths;
}

export async function getOrderByTrackNumber(trackNumber: string) {
  const order = (
    await axios.get(`orders/track/${trackNumber}`).catch<any>(() => {
      throw new Error('Track not found');
    })
  ).data;
  return order;
}

export async function createOrder(userPath: UserPath) {
  const res: string = (await axios.post('orders', userPath)).data;
  return res;
}
