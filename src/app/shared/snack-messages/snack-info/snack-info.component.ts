import { Component, OnInit, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'gc-snack-info',
  templateUrl: './snack-info.component.html',
  styleUrls: ['./snack-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackInfoComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data?: any
  ) {
  }
}
