import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponentElectron } from 'src/app/inventory/inventory.component.electron';
import { RouterModule, ROUTES } from '@angular/router';
import { ElectronService } from 'ngx-electron';


export const handleRoutes = (electronService: ElectronService) => {
  if (electronService.isElectronApp) {
    return [
      {
        path: '',
        loadChildren: () => import('./../../electron.module').then(m => m.ElectronModule)
      }
    ]
  }

  return [
    {
      path: '',
      loadChildren: () => import('./../../web.module').then(m => m.WebModule)
    }
  ]
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [{ provide: ROUTES, useFactory: handleRoutes, deps: [ElectronService], multi: true }]
})
export class RoutingModule { }
