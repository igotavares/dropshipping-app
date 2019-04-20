import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CUSTOMERS_API} from '../app.api';
import { Customer } from './customer/customer-model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';


@Injectable()
export class CustomersService {

  constructor(private http: HttpClient) {}

  search(search?: string): Observable<Customer[]> {
      let params: HttpParams = undefined;
      if (search) {
          params = new HttpParams().set('q', search)
      }
      return this.http
                 .get<Customer[]>(`${CUSTOMERS_API}/customers`, {params: params});
  }

  searchById(id: String): Observable<Customer> {
    return this.http
                .get<Customer>(`${CUSTOMERS_API}/customers/${id}`);
  }

  delete(id: String): Observable<string> {
    return this.http
                .delete<string>(`${CUSTOMERS_API}/customers/${id}`);
  }

  save(customer: Customer): Observable<string> {
    return this.http.post<string>(`${CUSTOMERS_API}/customers`, customer);
  }

  update(id: string, customer: Customer): Observable<string> {
    return this.http.put<string>(`${CUSTOMERS_API}/customers/${id}`, customer);
  }

}
