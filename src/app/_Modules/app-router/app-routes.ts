import { Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';


export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'index' },
    { path: '**', component: NotFoundComponent }
]