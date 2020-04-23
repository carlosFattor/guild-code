import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-component/home-page.component';
import { AuthGuardService } from '@shared/security/guard/auth-guard.service';
import { UserService } from '@shared/user-service/user.service';

@NgModule({
  imports: [RouterModule.forChild(HomeRoutingModule.routes)],
  exports: [RouterModule],
  providers: [
    UserService
  ]
})
export class HomeRoutingModule {
  static readonly routes: Routes = [
    {
      path: 'home',
      component: HomePageComponent,
      canActivate: [AuthGuardService]
    }
  ];
}
