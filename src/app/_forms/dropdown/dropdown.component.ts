import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
  }]
})

export class DropdownComponent implements OnInit, ControlValueAccessor {

  @Input() options:Array<any>;
  @Input() named:string;
  @Input() dropdownid:string;
  @Input() defaultValue:string;

  constructor() { }

  ngOnInit() {
  }

  private _value: any;

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    if (this._value !== value) {
      this._value = value;
      this.onChange(value);
    }
  }

  writeValue(value: any) {
    this._value = value;
  }

  change(item): void {
    this.onChange(item);
    this._value = item;
}

  onChange = (_) => { };
  onTouched = () => { };
  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

}
