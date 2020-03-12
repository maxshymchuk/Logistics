import { Router, Request, Response } from "express";
import * as passport from "passport";

export const router = Router();

router.get("/login", async (req: Request, res: Response) => {
  res.send(req.user);
});

router.get("/logout", async (req: Request, res: Response) => {
  req.logout();
});

router.post(
  "/login",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    res.send(req.user);
  }
);
