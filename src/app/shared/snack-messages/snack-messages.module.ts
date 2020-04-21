import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackInfoComponent } from './snack-info/snack-info.component';
import { SnackService } from './snack-service/snack-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    SnackInfoComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  providers: [
    SnackService,
    MatSnackBarModule
  ]
})
export class SnackMessagesModule { }
