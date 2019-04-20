import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CustomerDetailComponent } from './customer-detail.component';

export class LeaveCustomerDetailGuard implements CanDeactivate<CustomerDetailComponent> {

    canDeactivate(customerDetailComponent: CustomerDetailComponent,
                 router: ActivatedRouteSnapshot,
                 state: RouterStateSnapshot): boolean {
        if (!customerDetailComponent.isSaved()) {
            return window.confirm('Cliente não foi salvo! Deseja sair da tela?')
        } else {
            return true;
        }
    }

}