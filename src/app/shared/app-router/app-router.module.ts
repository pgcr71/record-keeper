import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appRoutes } from './app-routes'
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy', useHash: true })
  ],
  exports: [RouterModule]
})

export class AppRouterModule {

}
