import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { response } from 'src/utils/response.util';

@Injectable()
export class BuyerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException(
        response(false, 'User not authenticated!', null),
      );
    }

    if (user.role !== 'buyer') {
      throw new UnauthorizedException(
        response(false, 'Unauthorized. Only buyers can access this!', null),
      );
    }

    next();
  }
}
