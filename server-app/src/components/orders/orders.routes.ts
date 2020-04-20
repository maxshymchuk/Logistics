import { Request, Response, Router } from 'express';

import isOfType from '../../helpers/typeGuard';
import { User } from '../../models/user.models';
import { requiresAdmin, requiresLogin } from '../../helpers/utils';
import * as orderService from './orders.service';

export const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const result = await orderService.getOrders();
  res.send(result);
});

router.get(
  '/:request',
  requiresLogin(),
  async (req: Request, res: Response, next: any) => {
    if (req.params.request === 'username' && isOfType<User>(req.user, 'username')) {
      const result = await orderService.getOrdersByUsername(req.user.username);
      res.send(result);
    } else next();
  },
  async (req: Request, res: Response) => {
    const result = await orderService.getOrderById(req.params.request);
    res.send(result);
  }
);

router.get("/track/:track_number", async (req: Request, res: Response) => {
  const result = await orderService.getOrderByTrackNumber(req.params.track_number);
  res.send(result);
});

router.get("/paths/:path_params", requiresLogin(), async (req: Request, res: Response) => {
  const result = await orderService.getOrderPaths(req.params.path_params);
  res.status(200).send(result);
});

router.post("/", requiresLogin(), async (req: Request, res: Response) => {
  if (isOfType<User>(req.user, 'username')) {
    const result = await orderService.addOrder(req.user, req.body);
    res.send(result);
  }
});

router.put("/:order_id", requiresLogin(), async (req: Request, res: Response) => {
  const result = await orderService.updateOrder(req.body);
  res.send(result);
});

router.delete(
  "/:order_id",
  requiresAdmin(),
  async (req: Request, res: Response) => {
    const result = await orderService.deleteOrderById(req.params.order_id);
    res.send(result);
  }
);
