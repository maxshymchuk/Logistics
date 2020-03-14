import { Request, Response, Router } from 'express';

import { requiresAdmin } from '../../utils';
import * as vehicleService from './vehicles.service';

export const router = Router();

router.get("/", requiresAdmin(), async (req: Request, res: Response) => {
  const result = await vehicleService.getVehicles();
  res.status(result ? 200 : 404).send(result);
});

router.get("/regen", requiresAdmin(), async (req: Request, res: Response) => {
  await vehicleService.regenerateVehicles();
  res.status(200).send("Vehicles regenerated");
});

router.post("/", requiresAdmin(), async (req: Request, res: Response) => {
  const result = await vehicleService.addVehicle(req.body);
  res.status(result ? 200 : 401).send(result);
});

router.delete("/:vehicle_id", requiresAdmin(), async (req: Request, res: Response) => {
    const result = await vehicleService.deleteVehicleById(req.params.vehicle_id);
    res.status(result ? 200 : 403).send(result);
  }
);