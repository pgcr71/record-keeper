import { Component, OnInit,OnChanges, Inject, Input, SimpleChange, forwardRef} from '@angular/core';
import { AUTOID, AutoID } from 'src/app/auto-id.provide';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-inputtext',
  templateUrl: './inputtext.component.html',
  styleUrls: ['./inputtext.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputtextComponent),
    multi: true
  }]
})

export class InputtextComponent implements OnInit,ControlValueAccessor {
  tempid = this.autoID.newID();
  @Input()
  id = 'inputtext' + this.tempid;
  @Input()
  name = 'inputtext' + this.tempid;
  @Input()
  label

  onChange = (_) => { };
  onTouched = () => { };
 
  private value

  constructor(@Inject(AUTOID) private autoID:AutoID) { 

  }

  ngOnInit(){

  }
 
  change(item): void {
    this.onChange(item);
    this.value = item;
}

  writeValue(value: any) {
    this.value = value;
  }
  
  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
