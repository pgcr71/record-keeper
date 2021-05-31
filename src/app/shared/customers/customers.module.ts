import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersLandingComponent } from './customers-landing/customers-landing.component';
import { Route, RouterModule } from '@angular/router';
import { RepaymentComponent } from './repayments/repayment.component';
import { UserTransactionsComponent } from './user-transactions/user-transactions.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { RecentUsersComponent } from './recent-users/recent-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../loader/loader.module';
import { PipesModule } from '../pipes/pipes.module';
import { DropdownModule } from '../dropdown/dropdown.module';

const routes: Array<Route> = [
  {
    path: '',
    component: CustomersLandingComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'userTransactions'
      },
      {
        path: 'userTransactions',
        component: UserTransactionsComponent
      },
      {
        path: 'repayment',
        component: RepaymentComponent
      },
      {
        path: 'orders',
        component: PlaceOrderComponent
      },
    ]
  }
]

@NgModule({
  declarations: [
    CustomersLandingComponent,
    UserTransactionsComponent,
    PlaceOrderComponent,
    RepaymentComponent,
    RecentUsersComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    LoaderModule,
    PipesModule,
    DropdownModule
  ],
  exports: [RouterModule],
  bootstrap: [CustomersLandingComponent]
})
export class UsersModule { }
