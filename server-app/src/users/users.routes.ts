import { Router, Request, Response } from 'express';
import * as userController from './users.service';
import { config } from '../config';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const result = await userController.getUsers();
  res
    .header('Access-Control-Allow-Origin', '*')
    .status(result ? 200 : 404)
    .send(result);
});

router.get(`/:user_id{${config.idLength}}`, async (req: Request, res: Response) => {
  const result = await userController.getUserById(req.params.user_id);
  res
    .header('Access-Control-Allow-Origin', '*')
    .status(result ? 200 : 404)
    .send(result);
});

router.post('/', async (req: Request, res: Response) => {
  const result = await userController.addUser(req.body);
  res
    .header('Access-Control-Allow-Origin', '*')
    .status(result ? 200 : 403)
    .send(result);
});

router.post('/signin', async (req: Request, res: Response) => {
  // const result = await userController.authorizeUser(req.body);
  // res.status(result ? 200 : 404).send(result);
});

router.delete(`/:user_id{${config.idLength}}`, async (req: Request, res: Response) => {
  const result = await userController.deleteUserById(req.params.user_id);
  res
    .header('Access-Control-Allow-Origin', '*')
    .status(result ? 200 : 403)
    .send(result);
});

router.put('/', async (req: Request, res: Response) => {
  const result = await userController.updateUser(req.body);
  res
    .header('Access-Control-Allow-Origin', '*')
    .status(result ? 200 : 403)
    .send(result);
});
