import * as orderController from './orders.service';
import { Request, Response, Router } from 'express';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  orderController.getOrders((err, result) => {
    err ? res.status(404).send(err.message) : res.status(200).send(result);
  });
});

router.get('/:order_id', (req: Request, res: Response) => {
  orderController.getOrderById(req.params.order_id, (err, result) => {
    err ? res.status(404).send(err.message) : res.status(200).send(result);
  });
});

router.get('/:order_id/user', (req: Request, res: Response) => {
  orderController.getOrderUserLogin(req.params.order_id, (err, result) => {
    err ? res.status(404).send(err.message) : res.status(200).send(result);
  });
});

router.get('/track/:track_number', (req: Request, res: Response) => {
  orderController.getOrderByTrackNumber(req.params.track_number, (err, result) => {
    err ? res.status(404).send(err.message) : res.status(200).send(result);
  });
});

router.get('/price', (req: Request, res: Response) => {
  res.status(400).send('Input order properties');
});

router.get('/price/:order_params', (req: Request, res: Response) => {
  orderController.getOrderPrice(req.params.order_params, (err, result) => {
    err ? res.status(404).send(err.message) : res.status(200).send(result);
  });
});

router.post('/', (req: Request, res: Response) => {
  const result = orderController.addOrder(req.body);
  res.status(result ? 201 : 404).send(result);
});

router.put('/:order_id', async (req: Request, res: Response) => {
  const result = await orderController.updateOrder(req.body);
  res.status(result ? 200 : 404).send(result);
});
