import * as vehicleController from './vehicles.service';
import { Request, Response, Router } from 'express';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const result = await vehicleController.getVehicles();
  res.status(result ? 200 : 404).send(result);
});

router.get('/regen', async (req: Request, res: Response) => {
  await vehicleController.regenerateVehicles();
  res.status(200).send('Vehicles regenerated');
});
