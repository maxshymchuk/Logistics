import { Request, Response, Router } from 'express';
import * as passport from 'passport';

import { successResponse } from '../../helpers/messages';
import { isOfType } from '../../helpers/typeGuard';
import { User } from '../../models/user.models';

export const router = Router();

router.get("/login", async (req: Request, res: Response) => {
  if (isOfType<User>(req.user, 'username')) {
    const result = successResponse('Success', req.user);
    res.send(result);
  }
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
    if (isOfType<User>(req.user, 'username')) {
      const result = successResponse('Success', req.user);
      res.send(result);
    }
  }
);
