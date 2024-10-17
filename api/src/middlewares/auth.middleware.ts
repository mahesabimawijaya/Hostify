import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SECRET_KEY } from 'src/configs/config';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: SECRET_KEY,
      }) as User;
      req.user = decoded;
      next();
    } catch (error) {
      console.error('JWT error:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
