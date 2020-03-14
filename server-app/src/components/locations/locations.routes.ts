import { Request, Response, Router } from 'express';

import { requiresAdmin, requiresLogin } from '../../utils';
import * as locationService from './locations.service';

export const router = Router();

router.get("/", requiresLogin(), async (req: Request, res: Response) => {
  const result = await locationService.getLocations();
  res.status(result ? 200 : 404).send(result);
});

router.get("/regen", requiresAdmin(), async (req: Request, res: Response) => {
  await locationService.regenerateLocations();
  await locationService.regenerateMaps();
  res.status(200).send("Locations and maps regenerated");
});

router.get("/:location_name", requiresLogin(), async (req: Request, res: Response) => {
  const result = await locationService.getLocationByName(
    req.params.location_name
  );
  res.status(result ? 200 : 404).send(result);
});

router.post("/", requiresAdmin(), async (req: Request, res: Response) => {
  const result = await locationService.addLocation(req.body);
  res.status(result ? 200 : 404).send(result);
});
