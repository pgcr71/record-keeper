import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { AppRouterModule } from './_Modules/app-router/app-router.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DialogModule } from './_Modules/dialog/dialog.module';
import { ButtonsModule } from './_Modules/buttons/buttons.module';
import { TooltipModule } from './_Modules/tooltip/tooltip.module';

@NgModule({
  declarations: [
    AppComponent,
    PopUpComponent,
    TestComponent,
    Test2Component,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    AppRouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    DialogModule,
    ButtonsModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PopUpComponent, TestComponent, Test2Component]
})
export class AppModule { }
