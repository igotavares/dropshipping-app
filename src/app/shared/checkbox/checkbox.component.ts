import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mt-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

  @Input()
  label: string

  @Input()
  value: boolean

  onChange: any

  constructor() { }

  ngOnInit() {
  }

  check() {
    this.value = !this.value;
    this.onChange(this.value)
  }

  checked(): boolean {
    return this.value != null && this.value.valueOf()
  }

  writeValue(value: any): void {
    this.value = value === null ? false : value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }

}
