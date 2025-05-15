import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../builder/AppError";
import config from "../config";
import { TUserRole } from "../interfaces";
import { TJwtPayload } from "../modules/auth/auth.interface";
import * as AuthServices from "../modules/auth/auth.service";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You do not have the necessary permissions to access this resource.",
        );
      }

      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { id, role } = decoded;

      const user = await AuthServices.isUserExist(id);

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
      }

      if (user?.isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, "User is deleted!");
      }

      if (user?.status == "blocked") {
        throw new AppError(httpStatus.FORBIDDEN, "User is blocked!");
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You do not have the necessary permissions to access this resource.",
        );
      }

      req.user = decoded as TJwtPayload;
      next();
    },
  );
};

export default auth;
