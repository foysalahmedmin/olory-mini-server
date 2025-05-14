import { JwtPayload } from 'jsonwebtoken';
import { CartItem } from '../modules/cart/cart.interface';

export type TUserRole = 'user' | 'customer' | 'admin';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        id: number;
        email: string;
        role: TUserRole;
      };
    }
  }

  // Extend global Error constructor (optional)
  interface ErrorConstructor {
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
  }
}

// Extend express-session module to include cart in session
declare module 'express-session' {
  interface Session {
    cart?: CartItem[];
  }
}
