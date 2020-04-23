import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserModel } from '@domain/user.model';
import { LatLng } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class UserApi {

  private URI_USER_LAT_LNG = '/api/v1/users/latlng';

  constructor(
    private http: HttpClient
  ) { }

  updateUserLatLng(latLng: LatLng): Observable<UserModel> {

    return this.http.put<UserModel>(`${this.URI_USER_LAT_LNG}`, latLng);
  }
}
