import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'src/common/middlewares';
import { JsonWebTokenError } from 'jsonwebtoken';
import { AuthService } from './auth.service';
import { Http2ServerRequest } from 'http2';
import { IToken } from 'src/common/interfaces';

@Injectable()
export class BaseAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    protected readonly reflector: Reflector,
    private readonly secret: string,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    const token = await this.getTokenFromHeader(request);

    try {
      const payload = await this.verifyToken(token);
      request.user = payload;
      return true;
    } catch (err: any) {
      if (err instanceof JsonWebTokenError) {
        if (err.message === 'invalid signature') {
          throw new UnauthorizedException('Invalid token signature.');
        } else {
          throw new UnauthorizedException('Token expired.');
        }
      } else {
        throw err;
      }
    }
  }

  async getTokenFromHeader(request: Http2ServerRequest): Promise<string> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header.');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format.');
    }

    return token;
  }

  async verifyToken(token: string): Promise<IToken> {
    return await this.jwtService.verify<IToken>(token, {
      secret: this.secret,
    });
  }
}

@Injectable()
export class JwtAuthGuard extends BaseAuthGuard {
  constructor(jwtService: JwtService, reflector: Reflector) {
    super(jwtService, reflector, process.env.ACCESS_TOKEN_SECRET);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipGlobalGuard = this.reflector.get<boolean>(
      'skipGlobalGuard',
      context.getHandler(),
    );

    if (skipGlobalGuard) return true;

    const valid = await super.canActivate(context);

    return valid;
  }
}

@Injectable()
export class RefreshTokenGuard extends BaseAuthGuard {
  constructor(
    jwtService: JwtService,
    reflector: Reflector,
    private readonly authService: AuthService,
  ) {
    super(jwtService, reflector, process.env.REFRESH_TOKEN_SECRET);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const valid = await super.canActivate(context);

    if (!valid) return false;

    const request = context.switchToHttp().getRequest();

    const token = await this.getTokenFromHeader(request);

    const { sub } = await this.verifyToken(token);

    const realToken = await this.authService.checkRefreshTokenFromUser(sub);

    if (!realToken || token !== realToken.token) {
      throw new UnauthorizedException('Token mismatch.');
    }

    return true;
  }
}
