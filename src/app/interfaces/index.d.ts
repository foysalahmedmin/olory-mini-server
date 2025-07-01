import { JwtPayload } from "jsonwebtoken";
import { TCartItem } from "../modules/cart/cart.type";
import { TRole } from "../types/role.type";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        id: number;
        email: string;
        role: TRole;
      };
    }
  }

  // Extend global Error constructor (optional)
  interface ErrorConstructor {
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
  }
}

// Extend express-session module to include cart in session
declare module "express-session" {
  interface Session {
    cart?: TCartItem[];
  }
}
