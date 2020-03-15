import { Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';
import { LoginComponent } from 'src/app/login/login.component';
import { IndexComponent } from 'src/app/index/index.component';

export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'index' },
    { path: 'index', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotFoundComponent }
]