import { Router, Request, Response } from 'express';
import * as locationController from './locations.service';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const result = await locationController.getLocations();
  res.status(result ? 200 : 404).send(result);
});
