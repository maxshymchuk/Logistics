import { Request, Response, Router } from 'express';

import { UserMongo } from '../../models/users.models';
import { requiresAdmin, requiresLogin } from '../../utils';
import * as userService from './users.service';

export const router = Router();

router.get("/", requiresAdmin(), async (req: Request, res: Response) => {
  const result = await userService.getUsers();
  res.status(result ? 200 : 404).send(result);
});

router.get(
  "/:user_id",
  requiresAdmin(),
  async (req: Request, res: Response) => {
    const result = await userService.getUserById(req.params.user_id);
    res.status(result ? 200 : 404).send(result);
  }
);

router.post("/reg", async (req: Request, res: Response) => {
  const user: UserMongo = { ...req.body, _id: undefined, isAdmin: false };
  const result = await userService.addUser(user);
  res.status(result ? 200 : 403).send(result);
});

router.post("/", requiresAdmin(), async (req: Request, res: Response) => {
  const result = await userService.addUser(req.body);
  res.status(result ? 200 : 403).send(result);
});

router.delete(
  "/:user_id",
  requiresAdmin(),
  async (req: Request, res: Response) => {
    const result = await userService.deleteUserById(req.params.user_id);
    res.status(result ? 200 : 403).send(result);
  }
);

router.put("/", requiresLogin(), async (req: Request, res: Response) => {
  const result = await userService.updateUser(req.body);
  res.status(result ? 200 : 403).send(result);
});
