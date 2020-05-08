import { Injectable, TemplateRef, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackInfoComponent } from '../snack-info/snack-info.component';

@Injectable()
export class SnackService {

  private durationInSeconds = 3;
  private panelClass = 'warning';

  constructor(
    private snackBar: MatSnackBar
  ) { }

  openSnackInfoC(messages: string[], duration: number = this.durationInSeconds, panelClass: string = this.panelClass): void {
    this.snackBar.openFromComponent<SnackInfoComponent>(SnackInfoComponent, {
      duration,
      horizontalPosition: 'center',
      panelClass,
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
