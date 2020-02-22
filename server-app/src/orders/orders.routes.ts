import * as orderController from './orders.service';
import { Request, Response, Router } from 'express';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const result = await orderController.getOrders();
  res.status(result ? 200 : 404).send(result);
});

router.get('/:order_id', async (req: Request, res: Response) => {
  const result = await orderController.getOrderById(req.params.order_id);
  res.status(result ? 200 : 404).send(result);
});

router.get('/:order_id/user', async (req: Request, res: Response) => {
  const result = await orderController.getOrderUserLogin(req.params.order_id);
  res.status(result ? 200 : 404).send(result);
});

router.get('/track/:track_number', async (req: Request, res: Response) => {
  const result = await orderController.getOrderByTrackNumber(req.params.track_number);
  res.status(result ? 200 : 404).send(result);
});

router.get('/price/:order_params', async (req: Request, res: Response) => {
  const result = await orderController.getOrderPrice(req.params.order_params);
  res.status(200).send(result);
});

router.post('/', async (req: Request, res: Response) => {
  const result = await orderController.addOrder(req.body);
  res.status(result ? 201 : 404).send(result);
});

router.put('/:order_id', async (req: Request, res: Response) => {
  const result = await orderController.updateOrder(req.body);
  res.status(result ? 200 : 404).send(result);
});
