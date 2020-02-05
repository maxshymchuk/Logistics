import { Router, Request, Response } from "express";
import * as orderController from "./orders.controller";

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const result = await orderController.getOrders();
  res.status(result.code).send(result.content);
});

router.get('/:order_id', async (req: Request, res: Response) => {
  const result = await orderController.getOrderById(req.params.order_id);
  res.status(result.code).send(result.content);
});

router.get('/:order_id/user', async (req: Request, res: Response) => {
  const result = await orderController.getOrderUserId(req.params.order_id);
  res.status(result.code).send(result.content);
});

router.post('/', async (req: Request, res: Response) => {
  const result = await orderController.addOrder(req.body);
  res.status(result.code).send(result.content);
});

router.delete('/:order_id', async (req: Request, res: Response) => {
  const result = await orderController.deleteOrderById(req.params.order_id);
  res.status(result.code).send(result.content);
});