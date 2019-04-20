import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from './customer-model';
import { CustomersService } from '../customers.service';
import { NotificationService } from 'app/shared/messages/notification.service';

@Component({
  selector: 'mt-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {

  @Input() customer: Customer;
  @Output() deleteEvent = new EventEmitter();

  constructor(private notificationService: NotificationService, private customersService: CustomersService) { }

  ngOnInit() {
  }

  delete() {
    this.customersService.delete(this.customer.id)
      .subscribe((message: string) => {
          this.notificationService.notify('Cliente deletado com sucesso!');
      });
    this.deleteEvent.emit(this.customer);
  }

}
