import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Route } from "@angular/router";
import { BillingComponent } from "src/app/billing/billing.component";
import { FinanceComponent } from "src/app/finance/finance.component";
import { AddUserComponent } from "src/app/finance/modals/add-user/add-user.component";
import { InterestComponent } from "src/app/interest/interest.component";
import { InventoryComponent } from "src/app/inventory/inventory.component";
import { LoginComponent } from "src/app/login/login.component";
import { RepaymentsComponent } from "src/app/repayments/repayments.component";
import { SignupComponent } from "src/app/signup/signup.component";
import { ButtonsModule } from "../buttons/buttons.module";
import { DialogModule } from "../dialog/dialog.module";
import { DropdownComponent } from "../dropdown/dropdown.component";
import { InputtextComponent } from "../inputtext/inputtext.component";
import { MaterialModule } from "../material/material.module";
import { TableComponent } from "../table/table.component";
import { TooltipModule } from "../tooltip/tooltip.module";


const routes: Array<Route> = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'interest', component: InterestComponent },
  { path: 'orders', component: FinanceComponent },
  { path: 'products', component: InventoryComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'repayment', component: RepaymentsComponent }
]
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
    FinanceComponent,
    InterestComponent,
    BillingComponent,
    RepaymentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonsModule,
    ReactiveFormsModule,
    MaterialModule,
    TooltipModule,
    FormsModule,
    RouterModule.forChild(routes)
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
    FinanceComponent,
    InterestComponent,
    BillingComponent,
    RepaymentsComponent
  ]
})
export class AppCommonModule { }
