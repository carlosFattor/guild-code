import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environment';
import { Observable } from 'rxjs/internal/Observable';
import { UserModel } from '@domain/user.model';
import { LoginService } from '../login-service/login.service';
import { AuthService } from '@shared/security/services/auth.service';
import { UserStateService } from '@shared/user-state/user-state-service/user-state.service';
import { PushNotificationService } from '@shared/push-notification/push-notification.service';
import { filter, switchMap, take, first, distinctUntilChanged, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { UtilsService } from '@shared/utils/utils.service';
import { merge, concat } from 'rxjs';

@Component({
  selector: 'gc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  showHideFormLogin = false;
  private readonly CLIENT_ID = environment.clientId;
  readonly GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${this.CLIENT_ID}`;
  notificationEnabled$ = new Observable<boolean>();
  user$: Observable<UserModel> | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private authService: AuthService,
    private pushNotificationService: PushNotificationService,
    private utils: UtilsService
  ) { }

  ngOnInit(): void {
    this.notificationEnabled$ = this.pushNotificationService.notificationEnabled$;
    if (!this.user$) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (params?.code) {
          this.loginService.loadUserData(params);
        }
      });
    }
    if (this.loginService?.user$) {
      this.user$ = this.loginService?.user$
        .pipe(
          first(user => user !== null),
          tap((user) => this.getStatusSubscription(user.email))
        );
    }
  }

  getStatusSubscription(email: string): void {
    const device = this.utils.getDevice();
    this.pushNotificationService.verifyUserSubscription(email, device)
      .pipe(
        take(1),
      ).subscribe();
  }

  showHideLoginForm(): string {
    return (this.showHideFormLogin) ? 'github-access-show' : 'github-access-hide';
  }

  subscriber(): void {
    this.pushNotificationService.requestSubscription();
  }

  findMe(): void {
    this.loginService.centerUSer();
  }

  loggedOut(): void {
    this.authService.loggedOut();
    this.loginService.user$ = null;
  }
}
