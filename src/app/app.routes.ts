import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { LoginComponent } from './security/login/login.component';
import { LoggedInGuard } from './security/loggedin.guard';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent, canActivate: [LoggedInGuard]},
    {path: 'login/:to', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'customers', component: CustomersComponent, canActivate: [LoggedInGuard]},
    {path: 'customers/:id', component: CustomerDetailComponent, canActivate: [LoggedInGuard]},
    {path: 'customers/new', component: CustomerDetailComponent, canActivate: [LoggedInGuard]},
    {path: 'about', component: AboutComponent, canActivate: [LoggedInGuard]}
];
