import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { response } from 'src/utils/response.util';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const user = req.user;

    console.log('User from request:', user); // Debug log

    if (!user) {
      throw new UnauthorizedException(
        response(false, 'User not authenticated!', null),
      );
    }

    if (user.role !== 'admin') {
      throw new UnauthorizedException(
        response(false, 'Unauthorized. Only admin can access this!', null),
      );
    }

    next();
  }
}
