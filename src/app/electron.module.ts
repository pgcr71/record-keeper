import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponentElectron } from './inventory/inventory.component.electron';
import { InventoryServiceElectron } from './inventory/inventory.service.electron';
import { LoginServiceElectron } from './login/login.service.electron';
import { ButtonComponent } from './shared/buttons/button/button.component';
import { TableComponent } from './shared/table/table.component';
import { LoginComponentElectron } from './login/login.component.electron';
import { IndexComponentElectron } from './index/index.component.electron';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { InputtextComponent } from './shared/inputtext/inputtext.component';
import { ToasterComponent } from './shared/toaster/toaster.component';
import { SignupComponentElectron } from './signup/signup.component.electron';
import { SignupServiceElectron } from './signup/signup.service.electron';
import { FinanceComponentElectron } from './finance/finance.component.electron';
import { FinanceServiceElectron } from './finance/finance.service.electron';
import { InterestComponentElectron } from './interest/interest.component.electron';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { ButtonsModule } from './shared/buttons/buttons.module';
import { DialogModule } from './shared/dialog/dialog.module';
import { TooltipModule } from './shared/tooltip/tooltip.module';

const routes: Array<Route> = [
  {path: '', pathMatch:'full', redirectTo:'index'},
  { path: 'index', component: IndexComponentElectron },
  { path: 'login', component: LoginComponentElectron },
  { path: 'signup', component: SignupComponentElectron },
  { path: 'interest', component: InterestComponentElectron },
  { path: 'orders', component: FinanceComponentElectron },
  {path: 'products', component: InventoryComponentElectron}
]
@NgModule({
  declarations: [
    InventoryComponentElectron,
    TableComponent,
    LoginComponentElectron,
    IndexComponentElectron,
    DropdownComponent,
    SignupComponentElectron,
    InputtextComponent,
    FinanceComponentElectron,
    InterestComponentElectron
  ],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonsModule,
    ReactiveFormsModule,
    TooltipModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    InventoryServiceElectron,
    LoginServiceElectron,
    SignupServiceElectron,
    FinanceServiceElectron
  ]
})
export class ElectronModule { }
