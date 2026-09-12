import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DEMO_USER_EMAIL, DEMO_USER_ID } from './demo-user.constant.js';
import { type JwtPayload } from './jwt-payload.js';

/**
 * Garde JWT standard.
 *
 * Mode démo local : si `AUTH_DISABLED=1`, la garde court-circuite Passport et
 * injecte l'utilisateur de démonstration (celui créé par `npm run seed`). Cela
 * permet à la webapp locale de fonctionner sans écran de connexion. À n'utiliser
 * qu'en local — ne jamais activer en production.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    if (process.env.AUTH_DISABLED === '1') {
      const request = context.switchToHttp().getRequest();
      request.user = {
        sub: DEMO_USER_ID,
        email: DEMO_USER_EMAIL,
      } satisfies JwtPayload;
      return true;
    }
    return super.canActivate(context);
  }
}
