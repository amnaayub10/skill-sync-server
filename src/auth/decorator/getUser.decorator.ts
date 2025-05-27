import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from '../interfaces';

// Use generics to specify the return type
export const GetUser = createParamDecorator(
  <T extends keyof AuthenticatedUser | undefined = undefined>(
    data: T,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as AuthenticatedUser;

    if (data) {
      return user ? user[data] : undefined;
    }
    return user;
  },
);
