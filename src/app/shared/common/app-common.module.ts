import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { RepaymentComponent } from 'src/app/repayments/repayment.component';
import { UserTransactionsComponent } from 'src/app/user-transactions/user-transactions.component';
import { AddUserComponent } from 'src/app/add-user/add-user.component';
import { InventoryComponent } from 'src/app/inventory/inventory.component';
import { LoginComponent } from 'src/app/login/login.component';
import { PlaceOrderComponent } from 'src/app/place-order/place-order.component';
import { ReturnsComponent } from 'src/app/returns/returns.component';
import { SignupComponent } from 'src/app/signup/signup.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { DialogModule } from '../dialog/dialog.module';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { InputtextComponent } from '../inputtext/inputtext.component';
import { MaterialModule } from '../material/material.module';
import { TableComponent } from '../table/table.component';
import { TooltipModule } from '../tooltip/tooltip.module';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { PipesModule } from '../pipes/pipes.module';
import { RecentUsersComponent } from 'src/app/recent-users/recent-users.component';

const routes: Array<Route> = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'users', component: UserTransactionsComponent },
  { path: 'products', component: InventoryComponent },
  { path: 'repayment', component: RepaymentComponent },
  { path: 'orders', component: PlaceOrderComponent },
];
@NgModule({
  declarations: [
    AddUserComponent,
    InventoryComponent,
    TableComponent,
    LoginComponent,
    SignupComponent,
    InputtextComponent,
    TableComponent,
    DropdownComponent,
    UserTransactionsComponent,
    RepaymentComponent,
    PlaceOrderComponent,
    ReturnsComponent,
    RecentUsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonsModule,
    ReactiveFormsModule,
    MaterialModule,
    TooltipModule,
    AutocompleteModule,
    FormsModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  exports: [
    AddUserComponent,
    InventoryComponent,
    TableComponent,
    LoginComponent,
    SignupComponent,
    InputtextComponent,
    TableComponent,
    DropdownComponent,
    UserTransactionsComponent,
    RepaymentComponent,
    PlaceOrderComponent,
    ReturnsComponent,
    PipesModule,
    RecentUsersComponent
  ],
})
export class AppCommonModule { }
