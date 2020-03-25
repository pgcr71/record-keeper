import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouterModule } from './_Modules/app-router/app-router.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DialogModule } from './_Modules/dialog/dialog.module';
import { ButtonsModule } from './_Modules/buttons/buttons.module';
import { TooltipModule } from './_Modules/tooltip/tooltip.module';
import { FormsModule } from '@angular/forms';
import { DialogTemplateComponent } from './dialog-template/dialog-template.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './_Modules/interceptor/interceptor';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { SignupComponent } from './signup/signup.component';
import { DropdownComponent } from './_forms/dropdown/dropdown.component';
import { InputtextComponent } from './_forms/inputtext/inputtext.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AutoID, AUTOID } from './auto-id.provide';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    DialogTemplateComponent,
    LoginComponent,
    IndexComponent,
    SignupComponent,
    DropdownComponent,
    InputtextComponent
  ],
  imports: [
    AppRouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    DialogModule,
    ButtonsModule,
    TooltipModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:Interceptor,multi:true},
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {provide:AUTOID,useClass:AutoID}
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})

export class AppModule { }
