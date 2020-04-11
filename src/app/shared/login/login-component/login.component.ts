import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '@environment';
import { Observable } from 'rxjs/internal/Observable';
import { LoginApi } from '../login-service/login.api';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginApi: LoginApi
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.loadUserData(params);
    });

  }

  loadUserData(params: Params): void {
    if (params?.code) {
      this.loginApi.fetchUserData(params.code).subscribe(
        userData => console.log({ userData })
      );
    }
  }

  showHideLoginForm(): string {
    return (this.showHideFormLogin) ? 'github-access-show' : 'github-access-hide';
  }
}
