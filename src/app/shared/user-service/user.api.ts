import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserModel } from '@domain/user.model';
import { LatLng, map } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class UserApi {

  private URI_USER = '/api/v1/users';

  constructor(
    private http: HttpClient
  ) { }

  updateUserLatLng(latLng: LatLng): Observable<UserModel> {

    return this.http.put<UserModel>(`${this.URI_USER}/latlng`, latLng);
  }

  fetchUsersByLatLng(center: LatLng, zoom: number): Observable<Array<UserModel>> {

    return this.http.get<Array<UserModel>>(`${this.URI_USER}/${center.lat}/${center.lng}/${zoom}`);
  }
}
