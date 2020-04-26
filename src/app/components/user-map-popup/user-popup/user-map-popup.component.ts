import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserModel } from '@domain/user.model';

@Component({
  selector: 'gc-user-map-popup',
  templateUrl: './user-map-popup.component.html',
  styleUrls: ['./user-map-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMapPopupComponent implements OnInit {

  user: UserModel | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
