import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from './inventory.service';
import { ToasterService } from '../shared/toaster/toaster.service';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateBasis } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  styleUrls: ['./inventory.component.scss']
})

export class InventoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity','unit_price','rate_of_interest'];
  name = '';
  quantity = 0;
  price = 0;
  inventory = [];
  interestTypes = [];

  inventoryCreateForm: FormGroup;

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

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.inventoryCreateForm.valid) {
      this.is.add(this.inventoryCreateForm.value).subscribe((res) => {
          this.inventory = [...this.inventory, this.inventoryCreateForm.value];
          this.inventoryCreateForm.reset();
          this.snackBar.open('Data Saved Succesfully', "Close", {
            duration: 2000
          } )
      }, error => {
        console.log(error)
        this.snackBar.open(error.error.sqlMessage, "Close", {
          duration: 2000,
          panelClass: ['waring-snackbar']
        } )
      })
    }
  }
}
