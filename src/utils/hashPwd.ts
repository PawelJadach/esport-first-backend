import * as crypto from 'crypto';
import { hash } from '../config/keys.config';

export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac('sha512', hash);
  hmac.update(p);
  return hmac.digest('hex');
};
