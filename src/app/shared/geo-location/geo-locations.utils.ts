import { UserModel } from '@domain/user.model';
import { DivIcon, Util, DivIconOptions, tileLayer, LatLng } from 'leaflet';

export class GeoLocationUtils {

  readonly ZOOM_USER = 17;
  private readonly LAT_DEFAULT = 46.879966;
  private readonly LNG_DEFAULT = -121.726909;
  // tslint:disable-next-line:variable-name
  private _center = new LatLng(this.LAT_DEFAULT, this.LNG_DEFAULT);

  get center(): LatLng {
    return this._center;
  }

  set center(center: LatLng) {
    this._center = center;
  }

  getDefaultMapOptions(): { [key: string]: any } {
    return {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 5,
      center: this.center
    };
  }

  iconDefaultValue(user: UserModel): any {
    return {
      // tslint:disable-next-line:max-line-length
      mapIconUrl: `<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><defs><clipPath id="circleView"><circle cx="74" cy="75" r="55" fill="#FFFFFF" /></clipPath></defs><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><circle fill="{mapIconColorInnerCircle}" cx="74" cy="75" r="61"/><circle fill="#FFF" cx="74" cy="75" r="{pinInnerCircleRadius}"/><image href="${user.avatar_url}" height="150px" width="150px" clip-path="url(#circleView)"/></svg>`,
      mapIconColor: 'blue',
      mapIconColorInnerCircle: '#fff',
      pinInnerCircleRadius: 48
    };
  }

  getNewIcon(mapIconUrl: string, iconSettings: DivIconOptions): DivIcon {
    return new DivIcon({
      className: 'leaflet-data-marker',
      html: Util.template(mapIconUrl, iconSettings),
      iconAnchor: [18, 42],
      iconSize: [60, 60],
      popupAnchor: [15, -40]
    });
  }

  formatLatLng(lat: number, lng: number): LatLng {
    return new LatLng(lat, lng);
  }
}
