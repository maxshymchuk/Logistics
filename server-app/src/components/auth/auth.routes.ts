import { Request, Response, Router } from 'express';
import * as passport from 'passport';

import { errorResponse, successResponse } from '../../helpers/response';
import isOfType from '../../helpers/typeGuard';
import { User } from '../../models/user.models';

export const router = Router();

router.get("/login", async (req: Request, res: Response) => {
  if (req.user && isOfType<User>(req.user, 'username')) {
    res.send(successResponse('Success', req.user));
  } else {
    res.send(errorResponse('User not logged'));
  }
});

router.get("/logout", async (req: Request, res: Response) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      res.send(errorResponse(err));
    }
  });
  res.send(successResponse('Successful logout'));
});

router.post(
  "/login",
  passport.authenticate("local"),
  (req: Request, res: Response) => {
    if (isOfType<User>(req.user, 'username')) {
      res.send(successResponse('Successful login', req.user));
    }
  }
);
