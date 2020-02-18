import * as indexController from './index.service';

import { Router, Request, Response } from 'express';

export const router = Router();

router.get('/minus', async (req: Request, res: Response) => {
  const result = await indexController.moveTimeOn(-1);
  res.send(result);
});

router.get('/plus', async (req: Request, res: Response) => {
  const result = await indexController.moveTimeOn(1);
  res.header('Access-Control-Allow-Origin', '*').send(result);
});

router.get('/minus/:days', async (req: Request, res: Response) => {
  const result = await indexController.moveTimeOn(-req.params.days);
  res.header('Access-Control-Allow-Origin', '*').send(result);
});

router.get('/plus/:days', async (req: Request, res: Response) => {
  const result = await indexController.moveTimeOn(+req.params.days);
  res.header('Access-Control-Allow-Origin', '*').send(result);
});
