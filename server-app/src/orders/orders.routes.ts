import * as orderController from "./orders.service";
import * as qs from 'qs';

import { Router, Request, Response } from "express";
import { UserOrderInput } from "./orders.models";
import { config } from "../config";
import { getVehicleType } from "../vehicles/vehicles.service";

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const result = await orderController.getOrders();
  res.status(result ? 200 : 404).send(result);
});

router.get(`/:order_id{${config.idLength}}`, async (req: Request, res: Response) => {
  const result = await orderController.getOrderById(req.params.order_id);
  res.status(result ? 200 : 404).send(result);
});

router.get(`/:order_id{${config.idLength}}/user`, async (req: Request, res: Response) => {
  const result = await orderController.getOrderUserId(req.params.order_id);
  res.status(result ? 200 : 404).send(result);
});

router.get('/price', (req: Request, res: Response) => {
  res.status(400).send('Input order properties');
});

router.get('/price/:order_params', async (req: Request, res: Response) => {
  const orderParams: UserOrderInput = {
    from: 'Gomel',
    to: 'Minsk',
    who: 'octorix',
    vehicle: getVehicleType('Car'),
    cargos: ['Tablet', 'Mango'],
    message: 'Be careful!'
  }
  const result = await orderController.getOrderPrice(qs.stringify(orderParams));
  res.status(200).send(result);
});

router.post('/', async (req: Request, res: Response) => {
  const result = await orderController.addOrder(req.body);
  res.status(result ? 201 : 404).send(result);
});

router.put(`/:order_id{${config.idLength}}`, async (req: Request, res: Response) => {
  const result = await orderController.updateOrder(req.body);
  res.status(result ? 200 : 404).send(result);
});