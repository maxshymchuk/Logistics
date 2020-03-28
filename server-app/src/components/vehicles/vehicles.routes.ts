import { Request, Response, Router } from 'express';

import { requiresAdmin } from '../../utils';
import * as vehicleService from './vehicles.service';

export const router = Router();

router.get("/", requiresAdmin(), async (req: Request, res: Response) => {
  const result = await vehicleService.getVehicles();
  res.send(result);
});

router.get("/regen", requiresAdmin(), async (req: Request, res: Response) => {
  const result = await vehicleService.regenerateVehicles();
  res.send(result);
});

router.post("/", requiresAdmin(), async (req: Request, res: Response) => {
  const result = await vehicleService.addVehicle(req.body);
  res.send(result);
});

router.delete("/:vehicle_id", requiresAdmin(), async (req: Request, res: Response) => {
  const result = await vehicleService.deleteVehicleById(req.params.vehicle_id);
  res.send(result);
});