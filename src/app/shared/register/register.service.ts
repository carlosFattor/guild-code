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

  registerSubscriber(subscriber: any): void {
    this.registerApi.register(subscriber)
      .pipe(take(1))
      .subscribe(data => {
        console.log({ data });
      });
  }
}
