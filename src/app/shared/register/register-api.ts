import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterApi {

  constructor(
    private httpClient: HttpClient
  ) { }

  register(subscription: any): Observable<any> {
    return this.httpClient.post('/api/v1/subscriber', { subscription });
  }
}
