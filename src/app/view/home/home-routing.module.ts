import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { AuthGuardService } from '@shared/security/guard/auth-guard.service';

@NgModule({
  imports: [RouterModule.forChild(HomeRoutingModule.routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
  static readonly routes: Routes = [
    {
      path: '',
      component: HomePageComponent,
      canActivate: [AuthGuardService]
    }
  ];
}
