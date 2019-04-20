import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CUSTOMERS_API } from 'app/app.api';
import { User } from './user.model';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class LoginService {

    user: User;
    lastUrl: string;

    constructor(private http: HttpClient, private router: Router) {
        router.events.filter(route => route instanceof NavigationEnd)
                     .subscribe((route: NavigationEnd) => this.lastUrl = route.url)
    }

    isLogged(): boolean {
        return this.user !== undefined
    }

    login(login: string, password: string): Observable<User> {
        return this.http.post<User>(
                `${CUSTOMERS_API}/login`,
                {login: login, password: password},
                {headers: this.createHeader(login, password)}
            ).do(user => this.user = user);
    }

    createHeader(login: string, password: string): HttpHeaders {
        return new HttpHeaders()
                .set('Authorization', 'Basic ' + btoa(`${login}:${password}`));
    }

    logout() {
        this.user = undefined;
    }

    handleLogin(path: string = this.lastUrl) {
        this.router.navigate(['/login', btoa(path)]);
    }

}