/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, OnChanges, Inject, Input, forwardRef, EventEmitter } from '@angular/core';
import { AUTOID, AutoID } from 'src/app/auto-id.provide';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Output } from '@angular/core';

@Component({
  selector: 'rk-inputtext',
  templateUrl: './inputtext.component.html',
  styleUrls: ['./inputtext.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputtextComponent),
      multi: true,
    },
  ],
})
export class InputtextComponent implements OnInit, ControlValueAccessor, OnChanges {
  constructor(@Inject(AUTOID) private autoID: AutoID) { }
  tempid = this.autoID.newID();
  @Input()
  id;
  @Input()
  name;
  @Input()
  label;
  @Output()
  rkChange = new EventEmitter<string>();

  value;

  onChange = (_: unknown) => { };
  onTouched = () => { };

  ngOnChanges(SimpleChange) {
    if (SimpleChange.id) this.id = this.id + '_' + this.tempid;
    if (SimpleChange.name) this.name = this.name + '_' + this.tempid;
  }

  ngOnInit() {
    if (!this.id) {
      this.id = 'inputtext' + '_' + this.tempid;
    }
    if (!this.name) {
      this.name = 'inputtext' + '_' + this.tempid;
    }
  }

  change(item): void {
    this.value = item;
    this.onChange(item);
    this.rkChange.emit(item);
  }

  writeValue(value: unknown) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
