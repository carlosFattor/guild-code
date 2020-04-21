import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackInfoComponent } from './snack-info/snack-info.component';
import { SnackService } from './snack-service/snack-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    SnackInfoComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers: [
    SnackService,
    MatSnackBarModule
  ]
})
export class SnackMessagesModule { }
