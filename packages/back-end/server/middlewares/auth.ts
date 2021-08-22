import httpstatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { AUTHENTICATION_COOKIE } from "@tinder/shared-types";
import MissingAuthenticateHeaderException from "~common/missing-authenticate-header-exception";
import { generateUser } from "~resources/users";
import User from "~models/user";

const authHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const uuid = request.header(AUTHENTICATION_COOKIE);

  if (!uuid) {
    return response
      .status(httpstatus.UNAUTHORIZED)
      .send(MissingAuthenticateHeaderException);
  }
  let user = await User.findOne({ uuid });

  if (!user) {
    /**
     * Create new user if dont have
     * please only keep this in development
     * since it agaist any rule of authentication
     */
    user = await User.create(generateUser({ uuid }));
  }
  (request as any).currentUser = user.toJSON();
  return next();
};

export default authHandler;
