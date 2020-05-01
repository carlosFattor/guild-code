import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '@domain/user.model';
import { StorageService } from '@shared/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  // tslint:disable-next-line: variable-name
  private _user = new BehaviorSubject<UserModel | null>(null);
  readonly user$ = this._user.asObservable();


  constructor(
    private storage: StorageService
  ) {
    this.tryLoadUserDataCookie();
  }

  get user(): UserModel {
    return this._user.getValue();
  }

  set user(user: UserModel | null) {
    this._user.next(user);
  }

  private tryLoadUserDataCookie(): void {
    const temp = this.storage.localStorage('userData', (data: UserModel) => {
      return data;
    });
    if (temp) {
      this._user.next(temp);
    }
  }
}
