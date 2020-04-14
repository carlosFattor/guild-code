import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { LoginApi } from './login.api';
import { Observable } from 'rxjs/internal/Observable';
import { UserModel } from '@domain/user.model';
import { tap, take, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { StorageService } from '@shared/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user$: Observable<UserModel> | null = null;

  constructor(
    private loginApi: LoginApi,
    private storage: StorageService,
    private router: Router
  ) { }

  loadUserData(params: Params): void {
    if (params?.code) {
      this.user$ = this.loginApi.fetchUserData(params.code)
        .pipe(
          take(1),
          tap(data => {
            const temp = this.storage.formatData(data);
            this.storage.localStorage(null, () => {
              return temp;
            });
            this.tryLoadUserDataCookie();
          }),
          switchMap(loginData => of(loginData.userData))
        );
    }
    if (!this.user$) {
      this.tryLoadUserDataCookie();
    }
  }

  private tryLoadUserDataCookie(): void {
    this.user$ = null;
    const temp = this.storage.localStorage('userData', (data) => {
      return data;
    });
    if (temp) {
      this.user$ = of(temp);
      this.router.navigate(['/home'], { queryParams: { page: null } });
    }
  }
}
