import { Request, Response, Router } from 'express';

import { User } from '../../models/users.models';
import { requiresAdmin, requiresLogin } from '../../utils';
import * as orderService from './orders.service';

export const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const result = await orderService.getOrders();
  res.status(result ? 200 : 404).send(result);
});

router.get("/:order_id", async (req: Request, res: Response) => {
  const result = await orderService.getOrderById(req.params.order_id);
  res.status(result ? 200 : 404).send(result);
});

router.get("/:order_id/user", async (req: Request, res: Response) => {
  const result = await orderService.getOrderUsername(req.params.order_id);
  res.status(result ? 200 : 404).send(result);
});

router.get("/track/:track_number", async (req: Request, res: Response) => {
  const result = await orderService.getOrderByTrackNumber(
    req.params.track_number
  );
  res.status(result ? 200 : 404).send(result);
});

router.get("/paths/:path_params", async (req: Request, res: Response) => {
  const result = await orderService.getOrderPaths(req.params.path_params);
  res.status(200).send(result);
});

router.post("/", requiresLogin(), async (req: Request, res: Response) => {
  const result = await orderService.addOrder((req.user as User), req.body);
  res.status(result ? 201 : 404).send(result);
});

router.put("/:order_id", requiresLogin(), async (req: Request, res: Response) => {
  const result = await orderService.updateOrder(req.body);
  res.status(result ? 200 : 404).send(result);
});

router.delete(
  "/:order_id",
  requiresAdmin(),
  async (req: Request, res: Response) => {
    const result = await orderService.deleteOrderById(req.params.order_id);
    res.status(result ? 200 : 403).send(result);
  }
);
