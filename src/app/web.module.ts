import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory/inventory.component';
import { InputtextComponent } from './shared/inputtext/inputtext.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './shared/table/table.component';
import { Route, RouterModule } from '@angular/router';
import { FinanceComponent } from './finance/finance.component';
import { IndexComponent } from './index/index.component';
import { InterestComponent } from './interest/interest.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule } from './shared/buttons/buttons.module';
import { DialogModule } from './shared/dialog/dialog.module';
import { TooltipModule } from './shared/tooltip/tooltip.module';
import { DropdownComponent } from './shared/dropdown/dropdown.component';

const routes: Array<Route> = [
  {path: '', pathMatch:'full', redirectTo:'index'},
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'interest', component: InterestComponent },
  { path: 'orders', component: FinanceComponent }
]
@NgModule({
  declarations: [
    InventoryComponent,
    TableComponent,
    LoginComponent,
    IndexComponent,
    SignupComponent,
    InputtextComponent,
    TableComponent,
    DropdownComponent,
    FinanceComponent,
    InterestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonsModule,
    ReactiveFormsModule,
    TooltipModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class WebModule { }
