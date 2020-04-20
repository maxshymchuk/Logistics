import { Request, Response, Router } from 'express';

import { requiresAdmin } from '../../helpers/utils';
import * as timeService from './time.service';

export const router = Router();

router.get("/minus", requiresAdmin(), async (req: Request, res: Response) => {
  const result = await timeService.moveTimeOn(-1);
  res.send(result);
});

router.get("/plus", requiresAdmin(), async (req: Request, res: Response) => {
  const result = await timeService.moveTimeOn(1);
  res.send(result);
});

router.get("/minus/:days", requiresAdmin(), async (req: Request, res: Response) => {
  const result = await timeService.moveTimeOn(-req.params.days);
  res.send(result);
});

router.get("/plus/:days", requiresAdmin(), async (req: Request, res: Response) => {
  const result = await timeService.moveTimeOn(+req.params.days);
  res.send(result);
});
