import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment as ENV } from '@environment';
import { HomePageComponent } from './view/home/home-page/home-page.component';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes, { enableTracing: !ENV.production })],
  exports: [RouterModule]
})
export class AppRoutingModule {

  static readonly routes: Routes = [
    {
      path: 'home',
      component: HomePageComponent,
      // loadChildren: () => import('./view/home/home.module').then(m => m.HomeModule)
    },
    {
      path: 'github/oauth',
      loadChildren: () => import('./view/home/home.module').then(m => m.HomeModule)
    },
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    }
  ];
}
