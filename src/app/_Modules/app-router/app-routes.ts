import { Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';
import { LoginComponent } from 'src/app/login/login.component';
import { IndexComponent } from 'src/app/index/index.component';
import { SignupComponent } from 'src/app/signup/signup.component';
import { InventoryComponent } from 'src/app/inventory/inventory.component';
import { FinanceComponent } from 'src/app/finance/finance.component';

export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'index' },
    { path: 'index', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'inventory', component: InventoryComponent },
    {path:'finance',component:FinanceComponent},
    { path: '**', component: NotFoundComponent }
]