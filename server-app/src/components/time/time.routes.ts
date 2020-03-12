import * as timeService from "./time.service";

import { Router, Request, Response } from "express";

export const router = Router();

router.get("/minus", async (req: Request, res: Response) => {
  const result = await timeService.moveTimeOn(-1);
  res.send(result);
});

router.get("/plus", async (req: Request, res: Response) => {
  const result = await timeService.moveTimeOn(1);
  res.send(result);
});

router.get("/minus/:days", async (req: Request, res: Response) => {
  const result = await timeService.moveTimeOn(-req.params.days);
  res.send(result);
});

router.get("/plus/:days", async (req: Request, res: Response) => {
  const result = await timeService.moveTimeOn(+req.params.days);
  res.send(result);
});
