import { Request, Response, Router } from 'express';
import * as passport from 'passport';

import { successMsg } from '../../helpers/messages';
import { User } from '../../models/user.models';

export const router = Router();

router.get("/login", async (req: Request, res: Response) => {
  const result = successMsg(req.user as User);
  res.send(result);
});

router.get("/logout", async (req: Request, res: Response) => {
  req.logout();
  req.session.destroy((err) => {
    err && console.log(err);
  });
});

router.post(
  "/login",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    const result = successMsg(req.user as User);
    res.send(result);
  }
);
