import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { AppRouterModule } from './_Modules/app-router/app-router.module';
import { ButtonComponent } from './_common/button/button.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    PopUpComponent,
    TestComponent,
    Test2Component,
    ButtonComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    AppRouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[PopUpComponent,TestComponent,Test2Component]
})
export class AppModule { }
