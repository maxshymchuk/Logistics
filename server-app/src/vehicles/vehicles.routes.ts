import { Router, Request, Response } from 'express';
import * as vehicleController from './vehicles.service';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const result = await vehicleController.getVehicles();
  res
    .header('Access-Control-Allow-Origin', '*')
    .status(result ? 200 : 404)
    .send(result);
});
