import { Injectable, TemplateRef, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackInfoComponent } from '../snack-info/snack-info.component';

@Injectable()
export class SnackService {

  private durationInSeconds = 3;

  constructor(
    private snackBar: MatSnackBar
  ) { }

  openSnackInfoC(messages: string[], duration: number = this.durationInSeconds): void {
    this.snackBar.openFromComponent<SnackInfoComponent>(SnackInfoComponent, {
      duration,
      horizontalPosition: 'center',
      data: { messages }
    });
  }

  openSnackInfoT(template: TemplateRef<any>, duration: number = this.durationInSeconds): void {
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.horizontalPosition = 'center';
    config.horizontalPosition = 'center',

      this.snackBar.openFromTemplate(template, config);
  }

}
