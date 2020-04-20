import { Request, Response, Router } from 'express';

import { UserMongo } from '../../models/user.models';
import { requiresAdmin, requiresLogin } from '../../helpers/utils';
import * as userService from './users.service';

export const router = Router();

router.get("/", requiresAdmin(), async (req: Request, res: Response) => {
  const result = await userService.getUsers();
  res.send(result);
});

router.get(
  "/:user_id",
  requiresAdmin(),
  async (req: Request, res: Response) => {
    const result = await userService.getUserById(req.params.user_id);
    res.send(result);
  }
);

router.post("/reg", async (req: Request, res: Response) => {
  const user: UserMongo = { ...req.body, _id: undefined, isAdmin: false };
  const result = await userService.addUser(user);
  res.send(result);
});

router.post("/", requiresAdmin(), async (req: Request, res: Response) => {
  const result = await userService.addUser(req.body);
  res.send(result);
});

router.delete(
  "/:user_id",
  requiresAdmin(),
  async (req: Request, res: Response) => {
    const result = await userService.deleteUserById(req.params.user_id);
    res.send(result);
  }
);

router.put("/", requiresLogin(), async (req: Request, res: Response) => {
  const result = await userService.updateUser(req.body);
  res.send(result);
});
