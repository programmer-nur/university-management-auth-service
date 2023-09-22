import { NextFunction, Request, Response } from 'express';
import ApiError from '../../Errors/ApiError';
import httpStatus from 'http-status';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../helper/jwtHelper';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, ' You are not authorized');
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
      req.user = verifiedUser; // role , userid

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'FORBIDDEN');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
