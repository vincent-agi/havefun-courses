import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { DEMO_USER_ID, DEMO_USER_EMAIL } from './demo-user.constant.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    request.user = { sub: DEMO_USER_ID, email: DEMO_USER_EMAIL };
    return true;
  }
}
