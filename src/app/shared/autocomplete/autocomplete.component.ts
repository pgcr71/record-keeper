import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RequireMatch } from '../validators/require-match.validator';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor {
  @Input() data: Array<any> = [];
  @Input() key: string;
  @Input() addButtonText: string = 'Add';
  @Input() label: string = '';
  @Input() value: string | object;
  userOptions;
  onChange = () => undefined;
  onTouch = () => undefined;

  @Output() rkSelectedOption: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      inputValue: [this.value, [RequireMatch, Validators.required]],
    });
  }

  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.value && changes.value.currentValue !== changes.value.previousValue) {
      this.form && this.form.get('inputValue').setValue(changes.value.currentValue);
    }
  }
  onOptionSelect($event) {
    this.rkSelectedOption.emit($event);
  }

  writeValue(value) {
    this.value = value;
    this.form.get('inputValue').setValue(value);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }
}
