import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedInGuard implements CanActivate, CanLoad {

    constructor(private loginService: LoginService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkAuthenticatio(route.routeConfig.path);
    }

    canLoad(route: Route): boolean {
        return this.checkAuthenticatio(route.path);
    }

    checkAuthenticatio(path: string): boolean {
        const loggedIn = this.loginService.isLogged();
        if (!loggedIn) {
            this.loginService.handleLogin(`/${path}`);
        }
        return loggedIn;
    }

}
