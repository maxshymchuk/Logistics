import * as orderController from './orders.service';

import { Router, Request, Response } from 'express';
import { config } from '../config';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const result = await orderController.getOrders();
  res
    .header('Access-Control-Allow-Origin', '*')
    .status(result ? 200 : 404)
    .send(result);
});

router.get(`/:order_id{${config.idLength}}`, async (req: Request, res: Response) => {
  const result = await orderController.getOrderById(req.params.order_id);
  res
    .header('Access-Control-Allow-Origin', '*')
    .status(result ? 200 : 404)
    .send(result);
});

router.get(`/:order_id{${config.idLength}}/user`, async (req: Request, res: Response) => {
  const result = await orderController.getOrderUserLogin(req.params.order_id);
  res
    .header('Access-Control-Allow-Origin', '*')
    .status(result ? 200 : 404)
    .send(result);
});

router.get('/price', (req: Request, res: Response) => {
  res
    .header('Access-Control-Allow-Origin', '*')
    .status(400)
    .send('Input order properties');
});

router.get('/price/:order_params', async (req: Request, res: Response) => {
  console.log(req.params.order_params);
  const result = await orderController.getOrderPrice(req.params.order_params);
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
