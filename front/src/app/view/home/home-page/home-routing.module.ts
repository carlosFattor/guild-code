import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';

@NgModule({
  imports: [RouterModule.forChild(HomeRoutingModule.routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
  static readonly routes: Routes = [
    {
      path: '',
      component: HomePageComponent
    }
  ];
}
