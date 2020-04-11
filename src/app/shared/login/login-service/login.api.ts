import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoginApi {

  private URI_USER_BY_GITHUB = '/api/v1/users/github';

  constructor(
    private http: HttpClient
  ) { }

  fetchUserData(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post(`${this.URI_USER_BY_GITHUB}/${token}`, {}, httpOptions);
  }

  fetchUsers(): Observable<any> {
    return this.http.get('/api/v1/users');
  }
}
