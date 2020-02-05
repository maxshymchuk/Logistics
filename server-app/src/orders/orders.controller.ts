import * as mongoose from 'mongoose';

import { CustomResponse } from "../models";
import { Order } from "./orders.models";
import { orderSchema } from './orders.schemas';

const orderModel = mongoose.model<Order>('orders', orderSchema);

async function findOrderById(id: string): Promise<Order> {
  let result: Promise<Order>;
  try {
    result = orderModel.findOne({ _id: id }).exec();
  } catch (e) {
    console.log('Invalid id');
  }
  return result;
}

async function validatorOrderId(id: string): Promise<CustomResponse> {
  return await findOrderById(id) ? {
    status: {
      content: 'Ok',
      code: 200,
    },
    isFound: true
  } : {
    status: {
      content: 'Order not found',
      code: 404,
    },
    isFound: false
  }
}

export async function getOrders(): Promise<CustomResponse['status']> {
  return {
    content: await orderModel.find().exec(),
    code: 200
  }
}

export async function getOrderById(id: string): Promise<CustomResponse['status']> {
  const validator: CustomResponse = await validatorOrderId(id);
  return !validator.isFound ? validator.status : {
    content: await findOrderById(id),
    code: 200
  }
}

export async function getOrderUserId(id: string): Promise<CustomResponse['status']> {
  const validator = await validatorOrderId(id);
  return !validator.isFound ? validator.status : {
    content: (await findOrderById(id)).userId,
    code: 200
  }
}

export async function addOrder(order: Order): Promise<CustomResponse['status']> {
  orderModel.create(order, (err: Error) => err && console.log(err));
  return {
    content: 'Order added',
    code: 201
  }
}

export async function deleteOrderById(id: string): Promise<CustomResponse['status']> {
  const validator = await validatorOrderId(id);
  validator.isFound && orderModel.deleteOne({ _id: id }).exec();
  return !validator.isFound ? validator.status : {
    content: 'Order deleted',
    code: 200
  }
}

export async function updateOrder(order: Order) {
  const validator = await validatorOrderId(order._id);
  validator.isFound && orderModel.updateOne({ _id: order._id }, order).exec();
  return !validator.isFound ? validator.status : {
    content: await findOrderById(order._id),
    code: 200
  }
}