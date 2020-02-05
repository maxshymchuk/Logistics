import * as mongoose from 'mongoose';

import { Router, Request, Response } from "express";
import * as trackController from "./orders.controller";

export const router = Router();

// mongoose.connect('mongodb://127.0.0.1:27017/vehicles', { useNewUrlParser: true });

// const db = mongoose.connection;

// router.get('/', async (req: Request, res: Response) => {
//   const result = await trackController.getTracks();
//   res.status(result.code).send(result.content);
// });

// router.get('/:track_id', async (req: Request, res: Response) => {
//   const result = await trackController.getTrackById(req.params.track_id);
//   res.status(result.code).send(result.content);
// });

// router.get('/:track_id/user', async (req: Request, res: Response) => {
//   const result = await trackController.getTrackUserId(req.params.track_id);
//   res.status(result.code).send(result.content);
// });