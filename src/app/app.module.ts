import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRouterModule } from './shared/app-router/app-router.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './shared/interceptor/interceptor';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { AutoID, AUTOID } from './auto-id.provide';
import { ToasterComponent } from './shared/toaster/toaster.component';
import { ContentComponent } from './content/content.component';
import { NgxElectronModule } from 'ngx-electron';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleteModule } from './shared/autocomplete/autocomplete.module';
@NgModule({
  declarations: [AppComponent, NotFoundComponent, HeaderComponent, FooterComponent, ContentComponent, ToasterComponent],

  imports: [
    NgxElectronModule,
    BrowserModule,
    CommonModule,
    AppRouterModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: AUTOID, useClass: AutoID },
    { provide: MAT_DATE_LOCALE, useValue: 'en-IN' },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ToasterComponent],
})
export class AppModule {}
