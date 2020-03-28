import axios from 'axios';
import * as qs from 'qs';

import { Message } from '../models/message.models';
import { Order, OrderUser } from '../models/order.models';
import { UserPath } from '../models/path.models';

export async function getOrdersData() {
  const message: Message<Order[]> = (await axios.get('/orders')).data;
  return message;
}

export async function getOrdersByUsername() {
  const message: Message<Order[]> = (await axios.get('/orders/username')).data;
  return message;
}

export async function getOrderPaths(order: OrderUser) {
  const params = qs.stringify(order);
  const message: Message<UserPath[]> = (await axios.get(`orders/paths/${params}`)).data;
  return message;
}

export async function getOrderByTrackNumber(trackNumber: string) {
  const message: Message<Order> = (await axios.get(`orders/track/${trackNumber}`)).data;
  return message;
}

export async function createOrder(userPath: UserPath) {
  const message: Message<string> = (await axios.post('orders', userPath)).data;
  return message;
}

export async function removeOrderById(id: string) {
  const message: Message<string> = (await axios.delete(`/orders/${id}`)).data;
  return message;
}