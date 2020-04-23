import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginData } from '@domain/login-data.model';

@Injectable({
  providedIn: 'root'
})
export class LoginApi {

  private URI_USER_BY_GITHUB = '/api/v1/users/github';

  constructor(
    private http: HttpClient
  ) { }

  fetchUserData(token: string): Observable<LoginData> {

    return this.http.post<LoginData>(`${this.URI_USER_BY_GITHUB}/${token}`, {});
  }
}
