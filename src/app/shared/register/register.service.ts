import { Injectable } from '@angular/core';
import { RegisterApi } from './register-api';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private registerApi: RegisterApi
  ) { }

  registerSubscriber(subscriber: any, email: string): void {
    this.registerApi.register(subscriber, email)
      .pipe(take(1))
      .subscribe();
  }
}
