import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { InventoryComponent } from 'src/app/inventory/inventory.component';
import { LoginComponent } from 'src/app/login/login.component';
import { ReturnsComponent } from 'src/app/returns/returns.component';
import { SignupComponent } from 'src/app/signup/signup.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { DialogModule } from '../dialog/dialog.module';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { InputtextComponent } from '../inputtext/inputtext.component';
import { MaterialModule } from '../material/material.module';
import { TableComponent } from '../table/table.component';
import { TooltipModule } from '../tooltip/tooltip.module';
import { PipesModule } from '../pipes/pipes.module';
import { LoaderModule } from '../loader/loader.module';

const routes: Array<Route> = [
  { path: '', pathMatch: 'full', redirectTo: 'customers' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'customers',
    loadChildren: () => import('../../shared/customers/customers.module').then((m) => m.UsersModule),
  },
  { path: 'products', component: InventoryComponent },
];
@NgModule({
  declarations: [
    InventoryComponent,
    TableComponent,
    LoginComponent,
    SignupComponent,
    InputtextComponent,
    TableComponent,
    DropdownComponent,
    ReturnsComponent,
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
    RouterModule.forChild(routes),
    PipesModule,
    LoaderModule
  ],
  exports: [
    InventoryComponent,
    TableComponent,
    LoginComponent,
    SignupComponent,
    InputtextComponent,
    TableComponent,
    DropdownComponent,
    ReturnsComponent,
    PipesModule,
    LoaderModule
  ],
})
export class AppCommonModule { }
