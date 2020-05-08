import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackInfoComponent } from './snack-info/snack-info.component';
import { SnackService } from './snack-service/snack-service';
import { MatIconModule } from '@angular/material/icon';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AngularMaterialModule } from '@shared/angular-material/angular-material.module';

@NgModule({
  declarations: [
    SnackInfoComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  providers: [
    SnackService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ]
})
export class SnackMessagesModule { }
