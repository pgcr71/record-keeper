import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FinanceService } from './finance.service';
import { ToasterService } from '../shared/toaster/toaster.service';
import { DropdownComponent } from '../shared/dropdown/dropdown.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateBasis } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './modals/add-user/add-user.component';
export interface PeriodicElement {
  name: string;
  position: number;
  quantity: number;
  price: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-order',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})

export class FinanceComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity','unit_price','rate_of_interest'];
  name = '';
  quantity = 0;
  price = 0;
  order = [];
  interestTypes = [];

  orderCreateForm: FormGroup;
  userSearch: Observable<Array<any>>;
  users = [];
  productSearch: any;
  products = []

  constructor(
    private is: FinanceService,
    private ts: ToasterService,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar,
    private readonly matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.orderCreateForm = this.fb.group({
      user: ['', Validators.required],
      product: ['', Validators.required],
      quantity: [0, Validators.required]
    });
    this.is.getOrders().subscribe(result => {
      this.order = result || [];
    })
    this.is.getAllUsers().subscribe((users) => {
      this.users = users;
      this.orderCreateForm.get('user').setValue('')
    });

    this.is.getAllProducts().subscribe((products) => {
      console.log(products)
      this.products = products;
      this.orderCreateForm.get('product').setValue('')
    });

    this.userSearch = this.orderCreateForm.get('user').valueChanges
    .pipe(
      startWith(''),
      map(value => value && (typeof value === 'string' ? value : value['first_name'] + value['last_name'])),
      map(name => name ? this._userFilter(name) : this.users.slice())
    );

    this.productSearch = this.orderCreateForm.get('product').valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._productFilter(name) : this.products.slice())
    );
  }

  userDisplayFn(user): string {
    console.log(user)
    return (user && (user['first_name'] + user['last_name'])) ? user['first_name'] + user['last_name'] : '';
  }

  productDisplayFn(product): string {
    return product && product.name ? product.name: '';
  }

  private _userFilter(name: string) {
    const filterValue = name.toLowerCase();

    return this.users.filter(option => (option['first_name'] + option['last_name']).toLowerCase().indexOf(filterValue) === 0);
  }

  private _productFilter(name: string) {
    const filterValue = name.toLowerCase();

    return this.products.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  addUser() {
    const addUserPopup = this.matDialog.open(AddUserComponent);
    addUserPopup.afterClosed().subscribe((data) => {
      this.orderCreateForm.get('user').setValue(data)
    })
  }

  onSubmit() {
    if (this.orderCreateForm.valid) {
      console.log(this.orderCreateForm)
      this.is.saveOrders(this.orderCreateForm.value)
      .subscribe((res) => {
          this.order = [...this.order, this.orderCreateForm.value];
          this.orderCreateForm.reset();
          this.snackBar.open('Data Saved Succesfully', "Close", {
            duration: 2000
          } )
      }, error => {
        this.snackBar.open(error.error.sqlMessage, "Close", {
          duration: 2000,
          panelClass: ['waring-snackbar']
        } )
      })
    }
  }
}
