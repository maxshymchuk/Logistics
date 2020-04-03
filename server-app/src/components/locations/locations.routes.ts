import { Request, Response, Router } from 'express';

import { requiresAdmin, requiresLogin } from '../../utils';
import * as locationService from './locations.service';

export const router = Router();

router.get("/", requiresLogin(), async (req: Request, res: Response) => {
  const result = await locationService.getLocations();
  res.send(result);
});

router.get("/regen", requiresAdmin(), async (req: Request, res: Response) => {
  const locationsResponse = await locationService.regenerateLocations();
  const mapsResponse = await locationService.regenerateMaps();
  const result = `${locationsResponse.message}\n${mapsResponse.message}`;
  res.send(result);
});

router.get("/:location_name", requiresLogin(), async (req: Request, res: Response) => {
  const result = await locationService.getLocationByName(req.params.location_name);
  res.send(result);
});

router.post("/", requiresAdmin(), async (req: Request, res: Response) => {
  const result = await locationService.addLocation(req.body);
  res.send(result);
});

router.delete(
  "/:location_id",
  requiresAdmin(),
  async (req: Request, res: Response) => {
    const result = await locationService.deleteLocationById(req.params.location_id);
    res.send(result);
  }
);
