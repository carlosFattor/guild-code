import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment as ENV } from '@environment';
import { HomePageComponent } from './view/home/home-component/home-page.component';
import { ContainerLayoutComponent } from '@shared/container/container-layout/container-layout.component';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes, { enableTracing: !ENV.production })],
  exports: [RouterModule]
})
export class AppRoutingModule {

  static readonly routes: Routes = [
    {
      path: '',
      component: ContainerLayoutComponent,
      children: [
        {
          path: '',
          component: HomePageComponent
        },
        {
          path: 'home',
          component: HomePageComponent
        },
        {
          path: 'github/oauth',
          loadChildren: () => import('./view/home/home.module').then(m => m.HomeModule)
        },
      ]
    },
    {
      path: '**',
      redirectTo: '/'
    }
  ];
}
