import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

export type Role = 'admin' | 'user' | 'verified';
export const Roles = Reflector.createDecorator<Role[]>();

@Injectable()
export class RolesGuard extends AuthGuard {
  constructor(
    private reflector: Reflector,
    protected jwtService: JwtService,
  ) {
    super(jwtService);
  }

  async canActivate(context: ExecutionContext) {
    const base = await this.canActivate(context);
    if (!base) return false;

    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (roles.includes('admin') && !user?.isAdmin) {
      throw new UnauthorizedException();
    }
    if (roles.includes('user') && !user) {
      throw new UnauthorizedException();
    }
    if (roles.includes('verified') && !user.isVerified) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
