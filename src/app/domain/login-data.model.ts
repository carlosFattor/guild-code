import { UserModel } from './user.model';
import Tokens from './tokens.model';

export interface LoginData {
  tokenData?: Tokens;
  userData?: UserModel;
  sub?: boolean;
}
