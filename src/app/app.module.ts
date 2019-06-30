import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomersService } from './customers/customers.service';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { InputComponent } from './shared/input/input.component';
import { RadioComponent } from './shared/radio/radio.component';
import { CheckboxComponent } from './shared/checkbox/checkbox.component';
import { ApplicationErrorHandler } from './app.error-handler';
import { SnackbarComponent } from './shared/messages/snackbar/snackbar.component';
import { NotificationService } from './shared/messages/notification.service';
import { LoginComponent } from './security/login/login.component';
import { LoginService } from './security/login/login.service';
import { LoggedInGuard } from './security/loggedin.guard';
import { UserDetailComponent } from './header/user-detail/user-detail.component';
import { AuthInterceptor } from './security/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    CustomersComponent,
    CustomerComponent,
    CustomerDetailComponent,
    InputComponent,
    RadioComponent,
    CheckboxComponent,
    SnackbarComponent,
    LoginComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
              LoggedInGuard, CustomersService,
              NotificationService, LoginService,
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
              {provide: ErrorHandler, useClass: ApplicationErrorHandler},
              {provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
