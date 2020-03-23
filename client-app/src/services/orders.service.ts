import axios from 'axios';
import * as qs from 'qs';

import { UserPath } from '../models/locations.models';
import { Order, OrderUser } from '../models/orders.models';

export async function getOrdersData(): Promise<Order[]> {
  const orders: Order[] = (await axios.get('/orders')).data;
  return orders;
}

export async function getOrdersByUsername(): Promise<Order[]> {
  const orders: Order[] = (await axios.get('/orders/username')).data;
  return orders;
}

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

export async function createOrder(userPath: UserPath): Promise<string> {
  const res = (await axios.post('orders', userPath)).data;
  return res;
}

export async function removeOrderById(id: string): Promise<string> {
  const res = (await axios.delete(`/orders/${id}`)).data;
  return res;
}