import { Component, OnInit } from '@angular/core';
import { FinanceService } from './finance.service';
import { ToasterService } from '../shared/toaster/toaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './modals/add-user/add-user.component';
import { RequireMatch } from '../shared/validators/require-match.validator';
import { get } from 'lodash';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';
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

  displayedColumns: string[] = ['user', 'product', 'quantity'];
  name = '';
  quantity = 0;
  price = 0;
  order = [];
  interestTypes = [];

  orderCreateForm: FormGroup;
  userSearch: Observable<Array<any>>;
  users = [];
  productSearch: Observable<Array<any>>;
  products = []
  enableQuantity: boolean = false;
  maxDate = new Date();
  remainingStock: number;
  selectedProduct: void;
  stockInfo: { quantity: number; sold: number };
  constructor(
    private is: FinanceService,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar,
    private readonly matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.orderCreateForm = this.fb.group({
      user: ['', [Validators.required, RequireMatch]],
      product: ['', [Validators.required, RequireMatch]],
      quantity: [null, [Validators.required]],
      ordered_on: [new Date(), [Validators.required]],
      comments: ['']
    });
    // this.orderCreateForm.get('quantity').disable();
    this.is.getOrders().subscribe(result => {
      this.order = result || [];
    })
    this.is.getAllUsers().subscribe((users) => {
      this.users = users;
      this.orderCreateForm.get('user').setValue('');
    });

    this.is.getAllProducts().subscribe((products) => {
      this.products = products;
      this.orderCreateForm.get('product').setValue('');
    });

    this.userSearch = this.orderCreateForm.get('user').valueChanges
      .pipe(
        startWith(''),
        map(value => value && (typeof value === 'string' ? value : value['first_name'] + " " + value['last_name'])),
        map(name => name ? this._userFilter(name) : this.users.slice())
      );

    this.productSearch = this.orderCreateForm.get('product').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._productFilter(name) : this.products.slice()),
      );
  }

  userDisplayFn(user): string {
    return (user && (user['first_name'] + user['last_name'])) ? user['first_name'] + " " + user['last_name'] : '';
  }

  productDisplayFn(product): string {
    if (product && !product.name) {
      return "";
    }
    return product && product.name ? product.name : '';
  }

  private _userFilter(name: string) {
    const filterValue = name.toLowerCase();

    return this.users.filter(option =>
      (option['first_name'].toLowerCase()).includes(filterValue) ||
      (option['last_name'].toLowerCase()).includes(filterValue) ||
      (option['phone_number'].toLowerCase()).includes(filterValue) ||
      (option['first_name'] + " " + option['last_name']).toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _productFilter(name: string) {
    const filterValue = name.toLowerCase();

    return this.products.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onOptionSelect(product) {
    this.selectedProduct = product;
    this.getRemainingCount(product.id);
  }

  getRemainingCount(productId: string) {
    this.is.getRemainingStock(productId).subscribe((data) => {
      this.stockInfo = data;
      this.remainingStock = Number(data.quantity) - Number(data.sold);
    })
  }

  addUser() {
    const addUserPopup = this.matDialog.open(AddUserComponent);
    addUserPopup.afterClosed().subscribe((data) => {
      this.users = [...this.users, data]
      this.orderCreateForm.get('user').setValue(data);
    })
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.orderCreateForm.valid) {
      console.log(this.orderCreateForm)
      this.orderCreateForm.value.ordered_on = this.orderCreateForm.value.ordered_on.toISOString();
      this.is.saveOrders(this.orderCreateForm.value)
        .subscribe(() => {
          this.order = [...this.order, this.orderCreateForm.value];
          this.orderCreateForm.reset({
            product: '',
            user: '',
            quantity: 0
          });
          this.snackBar.open('Data Saved Succesfully', "Close", {
            duration: 2000
          })
        }, error => {
          console.log(error)
          this.snackBar.open(error.error.sqlMessage, "Close", {
            duration: 2000,
            panelClass: ['waring-snackbar']
          })
        })
    }
  }
}
