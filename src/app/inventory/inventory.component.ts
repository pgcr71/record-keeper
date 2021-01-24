import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from './inventory.service';
import { ToasterService } from '../shared/toaster/toaster.service';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateBasis } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { cloneDeep, get } from 'lodash';
export interface PeriodicElement {
  name: string;
  position: number;
  quantity: number;
  price: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class InventoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'unit_price', 'rate_of_interest', 'buttons'];
  name = '';
  quantity = 0;
  price = 0;
  inventory = [];
  interestTypes = [];
  editable = true;
  expandedElement: any;
  inventoryCreateForm: FormGroup;
  inventoryCreateFormCopy: FormGroup;
  inventoryEditForm: FormGroup;
  inventoryEditFormCopy: FormGroup;
  editMode = false;

  constructor(
    private is: InventoryService,
    private ts: ToasterService,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.inventoryCreateForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, Validators.required],
      rate_of_interest: [0, Validators.required],
      interest_type: [null, Validators.required],
      unit_price: ['', Validators.required],
      lot_number: [null, Validators.required],
      comments: ['']
    });
    this.is.get().subscribe(result => {
      console.log(result);
      this.inventory = result || [];
    })
    this.is.getInterestTypes().subscribe(result => {
      this.interestTypes = result;
      this.inventoryCreateForm.get('interest_type').setValue(this.interestTypes && this.interestTypes[0]);
    })
  }

  updateData(element) {
    this.is.update(this.inventoryEditForm.value).subscribe((res) => {
      this.editMode = false;
      this.inventory = this.inventory.map((el) => el.id === res.id ? res : el);
    }, err => console.log(err));
  }

  resetForm(element) {
    this.editMode = false;
  }

  setFormData(data) {
    this.editMode = true;
    this.inventoryEditForm = this.fb.group({
      name: [data.name, Validators.required],
      quantity: [data.quantity, Validators.required],
      rate_of_interest: [data.rate_of_interest, Validators.required],
      interest_type: [data.interest_type, Validators.required],
      unit_price: [data.unit_price, Validators.required],
      lot_number: [data.lot_number, Validators.required],
      comments: [data.comments],
      id: [data.id]
    });

    this.inventoryEditFormCopy = cloneDeep(this.inventoryEditForm);
  }

  onDelete(element) {
    this.is.delete(element).subscribe((res) => {
      this.inventory = this.inventory.filter((el) => el.id !== element.id);
    }, err => console.log(err))
  }
  compareWith(o1, o2) {
    if (!o1 || !o2) {
      return;
    }
    if (o1.id == o2.id)
      return true;
    else return false
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.inventoryCreateForm.valid) {
      this.is.add(this.inventoryCreateForm.value).subscribe((res) => {
        const id = get(res, "identifiers[0].id", null) || get(res, "id", null);
        this.inventory = [...this.inventory, { ...this.inventoryCreateForm.value, id: id }];
        this.inventoryCreateForm.reset({
          name: '',
          interest_type: this.interestTypes[0]
        });

        this.snackBar.open('Data Saved Succesfully', "Close", {
          duration: 2000
        })
      }, error => {
        this.snackBar.open(error.error.sqlMessage, "Close", {
          duration: 2000,
          panelClass: ['waring-snackbar']
        })
      })
    }
  }
}
