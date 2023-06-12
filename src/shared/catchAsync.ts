import { NextFunction, RequestHandler, Request, Response } from 'express';

const catchAsync = (fun: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      fun(req, res, next);
    } catch (error) {
      next();
    }
  };
};

export default catchAsync;
