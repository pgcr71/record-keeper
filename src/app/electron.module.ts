import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './shared/buttons/button/button.component';
import { TableComponent } from './shared/table/table.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { InputtextComponent } from './shared/inputtext/inputtext.component';
import { ToasterComponent } from './shared/toaster/toaster.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { ButtonsModule } from './shared/buttons/buttons.module';
import { DialogModule } from './shared/dialog/dialog.module';
import { TooltipModule } from './shared/tooltip/tooltip.module';
import { MaterialModule } from './shared/material/material.module';
import { FinanceComponent } from './finance/finance.component';
import { FinanceService } from './finance/finance.service';
import { InterestComponent } from './interest/interest.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryService } from './inventory/inventory.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { SignupComponent } from './signup/signup.component';
import { SignupService } from './signup/signup.service';
import { AddUserComponent } from './finance/modals/add-user/add-user.component';

const routes: Array<Route> = [
  {path: '', pathMatch:'full', redirectTo:'products'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'interest', component: InterestComponent },
  { path: 'orders', component: FinanceComponent },
  {path: 'products', component: InventoryComponent}
]
@NgModule({
  declarations: [
    InventoryComponent,
    TableComponent,
    LoginComponent,
    DropdownComponent,
    SignupComponent,
    InputtextComponent,
    FinanceComponent,
    InterestComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonsModule,
    ReactiveFormsModule,
    TooltipModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class ElectronModule { }
