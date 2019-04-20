import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginService = this.injector.get(LoginService);
        if (loginService.isLogged()) {
            const autRequest = request.clone({setHeaders: {'Authorization':
                'Basic ' + btoa(`${loginService.user.login}:${loginService.user.password}`)}});
            return next.handle(autRequest);
        } else {
            return next.handle(request);
        }
    }

}
