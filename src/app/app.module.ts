import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormErrorPipe } from './pipes/form-error.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ServerErrorPipe } from './pipes/server-error.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    FormErrorPipe,
    DashboardComponent,
    LoginComponent,
    ServerErrorPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
