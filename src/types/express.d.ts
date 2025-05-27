import { AuthenticatedUser } from 'src/auth/interfaces';

// Extend the Express Request interface
declare module 'express' {
  interface Request {
    user?: AuthenticatedUser;
  }
}
