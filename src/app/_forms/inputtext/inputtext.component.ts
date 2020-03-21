import { Component, OnInit, Input, Output, forwardRef } from '@angular/core';
import { EventEmitter } from 'protractor';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-inputtext',
  templateUrl: './inputtext.component.html',
  styleUrls: ['./inputtext.component.scss']
})
export class InputtextComponent {

  constructor() { }

  
//   private _value: any;

//   get value(): any {
//     return this._value;
//   }

//   set value(value: any) {
//     if (this._value !== value) {
//       this._value = value;
//       this.onChange(value);
//     }
//   }


//   writeValue(value: any) {
//     this.value = value;
//   }
  

//   change(item): void {
//     this.onChange(item);
//     this._value = item;
// }

//   onChange = (_) => { };
//   onTouched = () => { };
//   registerOnChange(fn) { this.onChange = fn; }
//   registerOnTouched(fn: () => void): void { this.onTouched = fn; }
//   registerOnd
//   ngOnInit() {
//   }

}
