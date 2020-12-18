import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouterModule } from './shared/app-router/app-router.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DialogModule } from './shared/dialog/dialog.module';
import { ButtonsModule } from './shared/buttons/buttons.module';
import { TooltipModule } from './shared/tooltip/tooltip.module';
import { FormsModule } from '@angular/forms';
import { DialogTemplateComponent } from './shared/dialog/dialog-template/dialog-template.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './shared/interceptor/interceptor';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { SignupComponent } from './signup/signup.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { InputtextComponent } from './shared/inputtext/inputtext.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AutoID, AUTOID } from './auto-id.provide';
import { InventoryComponent } from './inventory/inventory.component';
import { TableComponent } from './table/table.component';
import { ToasterComponent } from './toaster/toaster.component';
import { FinanceComponent } from './finance/finance.component';
import { ContentComponent } from './content/content.component';
import { InterestComponent } from './interest/interest.component';
import { NgxElectronModule } from 'ngx-electron';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    IndexComponent,
    SignupComponent,
    DropdownComponent,
    InputtextComponent,
    InventoryComponent,
    TableComponent,
    ToasterComponent,
    FinanceComponent,
    ContentComponent,
    InterestComponent
  ],

  imports: [
    AppRouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    DialogModule,
    ButtonsModule,
    TooltipModule,
    FormsModule,
    HttpClientModule,
    NgxElectronModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: AUTOID, useClass: AutoID }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ToasterComponent, DropdownComponent]
})

export class AppModule { }
