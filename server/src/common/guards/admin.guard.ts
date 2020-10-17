import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.user && request.user.isAdmin
  }
}
