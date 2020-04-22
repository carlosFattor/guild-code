import { LatLng } from 'leaflet';

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
  latLng?: LatLng;
}
