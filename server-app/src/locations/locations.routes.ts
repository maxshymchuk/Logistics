import * as locationController from './locations.service';
import { regenerateLocations, regenerateMaps } from './locations.service';
import { Request, Response, Router } from 'express';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const result = await locationController.getLocations();
  res.status(result ? 200 : 404).send(result);
});

router.get('/regen', async (req: Request, res: Response) => {
  await regenerateLocations();
  await regenerateMaps();
  res.status(200).send('Locations and maps regenerated');
});

router.get('/:location_name', async (req: Request, res: Response) => {
  const result = await locationController.getLocationByName(req.params.location_name);
  res.status(result ? 200 : 404).send(result);
});
