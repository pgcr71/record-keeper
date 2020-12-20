import { Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/shared/not-found/not-found.component';

export const appRoutes: Routes = [
  { path: '', loadChildren: () =>import('./routing.module').then(m => m.RoutingModule)},
  { path: '**', component: NotFoundComponent }
]
