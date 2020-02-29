import * as locationController from './locations.service';
import * as mongoose from 'mongoose';
import { Coordinate, Location, LocationMongo } from './locations.models';
import { locationSchema } from './locations.schemas';
import { regenerateLocations } from './locations.service';
import { Request, Response, Router } from 'express';
import { Route } from '../orders/orders.models';

export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const result = await locationController.getLocations();
  res.status(result ? 200 : 404).send(result);
});

router.get('/regen', async (req: Request, res: Response) => {
  await regenerateLocations();
  res.status(200).send('Locations regenerated');
});

router.get('/:location_name', async (req: Request, res: Response) => {
  const result = await locationController.getLocationByName(req.params.location_name);
  res.status(result ? 200 : 404).send(result);
});
