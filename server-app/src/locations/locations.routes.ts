import * as locationController from './locations.service';
import { Request, Response, Router } from 'express';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  locationController.getLocations((err, result) => {
    err ? res.status(404).send(err.message) : res.status(200).send(result);
  });
});

router.get('/:location_name', (req: Request, res: Response) => {
  locationController.getLocationByName(req.params.location_name, (err, result) => {
    err ? res.status(404).send(err.message) : res.status(200).send(result);
  });
});
