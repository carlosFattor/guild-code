import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment as ENV } from '@environment';
import { HomePageComponent } from './view/home/home-page.component';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes, { enableTracing: !ENV.production })],
  exports: [RouterModule]
})
export class AppRoutingModule {

  static readonly routes: Routes = [
    {
      path: '',
      component: HomePageComponent
    },
    {
      path: 'home',
      component: HomePageComponent,
    },
    {
      path: 'github/oauth',
      loadChildren: () => import('./view/home/home.module').then(m => m.HomeModule)
    },
    {
      path: '',
      redirectTo: '',
      pathMatch: 'full'
    }
  ];
}
