import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'src/common/middlewares';
import { JsonWebTokenError } from 'jsonwebtoken';


@Injectable()
export class BaseAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly secret: string,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("No authorization header.");
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException("Invalid authorization format.");
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.secret,
      });
      request.user = payload;
      return true;
    } catch (err: any) {
      if (err instanceof JsonWebTokenError) {
        if(err.message === "invalid signature") {
          throw new UnauthorizedException('Invalid token signature.');
        } else {
          throw new UnauthorizedException('Token expired.');
        }
      } else {
        throw err;
      }
    }
  }
}

@Injectable()
export class JwtAuthGuard extends BaseAuthGuard {
  constructor(jwtService: JwtService, reflector: Reflector) {
    super(jwtService, reflector, process.env.ACCESS_TOKEN_SECRET);
  }
}

@Injectable()
export class RefreshTokenGuard extends BaseAuthGuard {
  constructor(jwtService: JwtService, reflector: Reflector) {
    super(jwtService, reflector, process.env.REFRESH_TOKEN_SECRET);
  }
}
