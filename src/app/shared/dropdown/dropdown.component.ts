import { Component, OnInit, forwardRef, Input, Inject, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AutoID, AUTOID } from 'src/app/auto-id.provide';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  tempId = this.autoID.newID();
  @Input() multi = false;
  @Input() typeAhead = false;
  @Input() multiWithTypeAhead = false;
  @Input() options: any = [];
  @Input() hideOptions = false;
  @Output() filterResults = new EventEmitter<[]>();
  @Input() name: string;
  @Input() id: string = 'dropdown' + this.tempId;
  @Input() label: string;
  @Input() key: string;
  @Output() searchTerm = new EventEmitter<string>();
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
  tempid = this.autoID.newID();
  rotateIcon = false;
  displayList = false;
  copyOfOptions = [];
  displayInputInsteadOfButton = false;

  constructor(@Inject(AUTOID) private autoID: AutoID) { }

  ngOnInit() {
    this.copyOfOptions = JSON.parse(JSON.stringify(this.options || []));
  }

  ngOnChanges(simpleChanges) {
    if (simpleChanges && simpleChanges.hasOwnProperty('id')) {
      this.id = this.id + this.autoID;
    }
    if (simpleChanges && simpleChanges.hasOwnProperty('options')) {
      this.copyOfOptions = JSON.parse(JSON.stringify(this.options || []));
    }
  }

  getTypeOfOption(option) {
    return typeof option;
  }

  onTypeStart(value) {
    this.displayList = true;
    console.log(value)
    if (!value) {
      this.options = [...this.copyOfOptions];
      this.filterResults.emit(this.options);
      this.searchTerm.emit(value);
      return;
    }
    this.searchTerm.emit(value);
    this.options = this.copyOfOptions.filter((option) => {
      if (this.key) {
        return option[this.key].toLowerCase().includes(value && value.toLowerCase());
      }
      return option.toLowerCase().includes(value && value.toLowerCase());
    });
    this.filterResults.emit(this.options)
  }

  writeValue(value: any) {
    this._value = value;
  }

  onButtonClick() {
    this.toggle();
  }

  onOptionClick(event, value, index) {
    event.stopPropagation();
    this.value = value;
    this.onChange(value);
    this.toggle();
  }

  toggle() {
    this.displayList = !this.displayList;
    this.rotateIcon = !this.rotateIcon;
    this.displayInputInsteadOfButton = !this.displayInputInsteadOfButton;
  }

  onChange = (_) => { };
  onTouched = () => { };
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
