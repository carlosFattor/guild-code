import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerLayoutComponent } from './container-layout/container-layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ContainerLayoutComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ContainerLayoutComponent
  ]
})
export class ContainerModule { }
