import axios from 'axios';
import * as qs from 'qs';

import { ServerResponse } from '../models/message.models';
import { Order, OrderPaths } from '../models/order.models';
import { UserPath } from '../models/path.models';

export async function getOrdersData() {
  const response: ServerResponse<Order[]> = (await axios.get('/orders')).data;
  return response;
}

export async function getOrdersByUsername() {
  const response: ServerResponse<Order[]> = (await axios.get('/orders/username')).data;
  return response;
}

export async function getOrderPaths(order: OrderPaths) {
  const params = qs.stringify(order);
  const response: ServerResponse<UserPath[]> = (await axios.get(`orders/paths/${params}`)).data;
  return response;
}

export async function getOrderByTrackNumber(trackNumber: string) {
  const response: ServerResponse<Order> = (await axios.get(`orders/track/${trackNumber}`)).data;
  return response;
}

export async function createOrder(userPath: UserPath) {
  const response: ServerResponse<string> = (await axios.post('orders', userPath)).data;
  return response;
}

export async function removeOrderById(id: string) {
  const response: ServerResponse = (await axios.delete(`/orders/${id}`)).data;
  return response;
}