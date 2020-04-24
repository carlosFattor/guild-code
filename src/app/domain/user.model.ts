import { Location } from '@domain/location.interface';
export interface UserModel {
  login?: string;
  id?: string;
  avatar_url?: string;
  email?: string;
  repo_url?: string;
  bio?: string;
  blog?: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
  loc?: Location;
}
