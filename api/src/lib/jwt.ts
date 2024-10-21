import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from 'src/configs/config';

export const createToken = (payload: any, expiresIn: string = '1hr') => {
  return sign(payload, SECRET_KEY, { expiresIn });
};
