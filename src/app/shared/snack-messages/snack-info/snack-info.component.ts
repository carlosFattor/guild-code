import { Component, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'gc-snack-info',
  templateUrl: './snack-info.component.html',
  styleUrls: ['./snack-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackInfoComponent {

  constructor(
    public snackBarRef: MatSnackBarRef<SnackInfoComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data?: any
  ) {
  }
}
