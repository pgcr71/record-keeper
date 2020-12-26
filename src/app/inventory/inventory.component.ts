import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InventoryService } from './inventory.service';
import { ToasterService } from '../shared/toaster/toaster.service';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateBasis } from '@angular/flex-layout';
export interface PeriodicElement {
  name: string;
  position: number;
  quantity: number;
  price: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', quantity: 1.0079, price: 'H' },
  { position: 2, name: 'Helium', quantity: 4.0026, price: 'He' },
  { position: 3, name: 'Lithium', quantity: 6.941, price: 'Li' },
  { position: 4, name: 'Beryllium', quantity: 9.0122, price: 'Be' },
  { position: 5, name: 'Boron', quantity: 10.811, price: 'B' },
  { position: 6, name: 'Carbon', quantity: 12.0107, price: 'C' },
  { position: 7, name: 'Nitrogen', quantity: 14.0067, price: 'N' },
  { position: 8, name: 'Oxygen', quantity: 15.9994, price: 'O' },
  { position: 9, name: 'Fluorine', quantity: 18.9984, price: 'F' },
  { position: 10, name: 'Neon', quantity: 20.1797, price: 'Ne' },
];
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})

export class InventoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'price'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: PeriodicElement[] = ELEMENT_DATA;
  name = '';
  quantity = 0;
  price = 0;
  inventory = [];
  headings = ['Name', 'Quantity', 'Price'];


  inventoryCreateForm: FormGroup;

  constructor(
    private is: InventoryService,
    private ts: ToasterService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit() {
    this.inventoryCreateForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, Validators.required],
      interestRate: [2, Validators.required],
      interestType: ['simple', Validators.required],
      unit_price: ['', Validators.required]
    });
    this.is.get().subscribe(result => {
      this.inventory = [...result['data']];
      this.ts.success(result['message'])
    })
  }

  onSubmit() {
    if (this.inventoryCreateForm.valid) {
      console.log(this.inventoryCreateForm)
      this.data.push(this.inventoryCreateForm.value);
      this.is.add(this.inventoryCreateForm.value).subscribe((res) => {
        if (res['done']) {
          this.data.push(this.inventoryCreateForm.value);
          this.ts.success(res['message'])
        }
      }, error => {
        this.ts.danger(error.error.message)
      })
    }
  }
}
