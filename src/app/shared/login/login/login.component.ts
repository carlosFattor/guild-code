import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'gc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  showHideFormLogin = false;

  constructor() { }

  ngOnInit(): void {
  }

  showHideLoginForm(): string {
    return (this.showHideFormLogin) ? 'github-access-show' : 'github-access-hide';
  }

}
