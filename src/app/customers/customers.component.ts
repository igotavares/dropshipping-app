import { Component, OnInit } from '@angular/core';
import { Customer } from './customer/customer-model';
import { Title } from '@angular/platform-browser';
import { CustomersService } from './customers.service';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mt-customers',
  templateUrl: './customers.component.html',
  viewProviders: [Title],
  animations: [
    trigger('toggleSearch', [
        state('hidden', style({
          opacity: 0,
          'max-height': '0px'
        })),
        state('visible', style({
          opacity: 1,
          'max-height': '70px',
          'margin-top': '20px'
        })),
        transition('* => *', animate('250ms 0s ease-in-out'))
      ]
    )
  ]
})
export class CustomersComponent implements OnInit {

  searchBarState = 'hidden'

  customers: Customer[];

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(title: Title, private fb: FormBuilder, private customersService: CustomersService) {
    title.setTitle('Customers');
  }

  ngOnInit() {
      this.searchControl = this.fb.control('');
      this.searchForm = this.fb.group({
        searchControl: this.searchControl
      })

      this.searchControl.valueChanges
          .debounceTime(500)
          .distinctUntilChanged()
          .switchMap(search => this.customersService.search(search)
                                                    .catch(error => Observable.from([])))
          .subscribe(customers => this.customers = customers);

      this.customersService.search()
          .subscribe(customers => this.customers = customers)
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

  delete(customer: Customer) {
    this.customers = this.customers.filter(item => item !== customer);
  }

}