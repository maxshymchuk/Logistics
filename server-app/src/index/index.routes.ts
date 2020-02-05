import { Router, Request, Response } from "express";

export const router = Router();

router.get('/', function(req: Request, res: Response) {
  res.send('index');
});