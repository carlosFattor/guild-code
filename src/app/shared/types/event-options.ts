import { LatLng } from 'leaflet';

export interface EventOptions {
  eventType: string;
  center: LatLng;
  zoom: number;
}
