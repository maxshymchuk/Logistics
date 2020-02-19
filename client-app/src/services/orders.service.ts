import axios from 'axios';
import * as qs from 'qs';
import { InputState } from '../pages/Orders/Order';

export async function getOrderPrice(order: InputState) {
  const params = qs.stringify(order);
  const price = (await axios.get(`orders/price/${params}`)).data;
  return price;
}
