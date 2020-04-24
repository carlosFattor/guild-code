import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserModel } from '@domain/user.model';
import { LatLng } from 'leaflet';

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

  fetchUsers(): Observable<Array<UserModel>> {

    return this.http.get<Array<UserModel>>(this.URI_USER);
  }
}
