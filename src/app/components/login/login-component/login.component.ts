import { Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from '@environment';
import { Observable } from 'rxjs/internal/Observable';
import { UserModel } from '@domain/user.model';
import { LoginService } from '../login-service/login.service';

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

  user$: Observable<UserModel> | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    if (!this.user$) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.loginService.loadUserData(params);
      });
    }
    this.user$ = this.loginService.user$;
  }

  showHideLoginForm(): string {
    return (this.showHideFormLogin) ? 'github-access-show' : 'github-access-hide';
  }
}
