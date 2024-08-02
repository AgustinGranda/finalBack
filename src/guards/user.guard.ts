import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
  
  @Injectable()
  export class UserGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {

      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
    
      try {

        const payload = await this.jwtService.verifyAsync(token,{secret:'moviesadviters'});
        if(payload.role === "user" || payload.role === "admin")
            return true;
        return false;

      } catch {
        throw new UnauthorizedException();
      }
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const token = request.headers.authorization
      return token
    }
  }