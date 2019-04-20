import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Customer } from 'app/customers/customer/customer-model';
import { CustomersService } from 'app/customers/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RadioOption } from 'app/shared/radio/radio.-option.model';
import { NotificationService } from 'app/shared/messages/notification.service';
import 'rxjs/add/operator/pluck'

@Component({
  selector: 'mt-customer-detail',
  templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent implements OnInit {

  id: string;
  customerForm: FormGroup;

  genderOptions: RadioOption[] = [
    {label: 'Masculino', value: 'M'},
    {label: 'Feminino', value: 'F'}
  ]

  constructor(private router: Router,
              private notificationService: NotificationService,
              private service: CustomersService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.formBuilder.group(({
      name: this.formBuilder.control('' , [Validators.required, Validators.minLength(3)]),
      surname: this.formBuilder.control('', [Validators.required]),
      documentNumber: this.formBuilder.control('', [Validators.required]),
      gender: this.formBuilder.control('', [Validators.required]),
      birthday: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required]),
      contact: this.formBuilder.group({
        telephone: this.formBuilder.control(''),
        mobile: this.formBuilder.control('')
      }),
      company: this.formBuilder.control(''),
      address: this.formBuilder.group({
        street: this.formBuilder.control('', [Validators.required]),
        number: this.formBuilder.control('', [Validators.required]),
        complement: this.formBuilder.control(''),
        country: this.formBuilder.control('', [Validators.required]),
        state: this.formBuilder.control('', [Validators.required]),
        town: this.formBuilder.control('', [Validators.required]),
        zipCode: this.formBuilder.control('', [Validators.required])
      }),
      acceptMarketing: this.formBuilder.control(false, [Validators.required]),
      comments: this.formBuilder.control('')
    }))

    if (this.route.snapshot.params.id !== undefined
        && this.route.snapshot.params.id !== null
        && this.route.snapshot.params.id !== 'new') {
          this.route.params.pluck('id')
          .switchMap((id: string) => {
            this.id = id;
            return this.service.searchById(this.id);
          })
          .subscribe(customer => {
            this.customerForm.patchValue(customer);
          });
    }
  }

  save(customer: Customer) {
    if (this.id === undefined || this.id === null) {
      this.service.save(customer)
                  .subscribe((id: string) => {
                    this.notificationService.notify(`Cadastro realizado com sucesso: ${id}`)
                    this.router.navigate(['/customers'])
                  })
    } else {
      this.service.update(this.id, customer)
                  .subscribe((value: string) => {
                    this.notificationService.notify(`Alteração realizado com sucesso`)
                    this.router.navigate(['/customers'])
                  })
    }
  }

  isSaved(): boolean {
    return !this.customerForm.dirty;
  }

}
