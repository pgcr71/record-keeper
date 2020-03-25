import { Component, OnInit,OnChanges, Inject, Input, SimpleChange} from '@angular/core';
import { AUTOID, AutoID } from 'src/app/auto-id.provide';

@Component({
  selector: 'app-inputtext',
  templateUrl: './inputtext.component.html',
  styleUrls: ['./inputtext.component.scss']
})
export class InputtextComponent implements OnInit,OnChanges {
  id = this.autoID.newID();
  @Input()
  appID = 'inputtext' + this.id;
  @Input()
  appName = 'inputtext' + this.id;
  @Input()
  appLabel
  
  constructor(@Inject(AUTOID) private autoID:AutoID) { 

  }

  ngOnInit(){

  }

  ngOnChanges(SimpleChange){

  }
  
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
