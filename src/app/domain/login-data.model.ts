import { UserModel } from './user.model';

export interface LoginData {
  tokenData: any;
  userData?: UserModel;
}
