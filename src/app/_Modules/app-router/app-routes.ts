import { Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';
import { Test2Component } from 'src/app/test2/test2.component';


export const appRoutes: Routes = [
    { path: 'index', component: Test2Component },
    { path: '', pathMatch: 'full', redirectTo: 'index' },
    { path: '**', component: NotFoundComponent }
]