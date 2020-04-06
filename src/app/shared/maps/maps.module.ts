import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseMapDirective } from './base-maps/base-map.directive';

@NgModule({
  declarations: [
    BaseMapDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BaseMapDirective
  ]
})
export class MapsModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: MapsModule, providers: [] };
  }
}
