import { Router, Request, Response } from "express";
import * as userController from './user.controller';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const result = await userController.getUsers();
  res.status(result.code).send(result.content);
});

router.get('/:user_id', async (req: Request, res: Response) => {
  const result = await userController.getUserById(req.params.user_id);
  res.status(result.code).send(result.content);
});

router.post('/', async (req: Request, res: Response) => {
  const result = await userController.addUser(req.body);
  res.status(result.code).send(result.content);
});

router.delete('/:user_id', async (req: Request, res: Response) => {
  const result = await userController.deleteUserById(req.params.user_id);
  res.status(result.code).send(result.content);
});

router.put('/', async (req: Request, res: Response) => {
  const result = await userController.updateUser(req.body);
  res.status(result.code).send(result.content);
});