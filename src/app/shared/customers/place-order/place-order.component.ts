import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { FinanceService } from '../finance.service';
import { cloneDeep, get, orderBy } from 'lodash';
import { AppService } from 'src/app/app.service';
import { InventoryService } from 'src/app/inventory/inventory.service';
import { RequireMatch } from '../../validators/require-match.validator';

@Component({
  selector: 'app-orders',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {
  userInfo: any;
  orderCreateForm: FormGroup;
  products = [];
  productSearch: Observable<any>;
  selectedProduct: any;
  maxDate = new Date();
  order: any;
  activatedRouteSub: any;
  interestTypes: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly fs: FinanceService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly appService: AppService,
    private readonly is: InventoryService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.orderCreateForm = this.fb.group({
      product: ['', [Validators.required, RequireMatch]],
      quantity: [null, [Validators.required]],
      ordered_on: [new Date(), [Validators.required]],
      comments: [''],
      user: ['', Validators.required],
      monthly_interest: ['', Validators.required],
      interest_type: [null, Validators.required],
      compounding_period: []
    });

    this.activatedRouteSub = this.appService.activeTransaction$.pipe(
      tap((order) => this.order = order),
      switchMap(() => this.appService.activeUser),
      tap((userInfo) => this.userInfo = userInfo),
      switchMap(() => this.is.getInterestTypes()),
      tap((interestTypes) => this.interestTypes = interestTypes),
      switchMap(() => this.fs.getAllProducts())
    ).subscribe((products) => {
      this.products = products;
      if (this.order) {
        this.orderCreateForm.setControl('id', new FormControl(this.order.id));
        this.orderCreateForm.reset({
          ...this.order,
          user: this.userInfo
        });
      } else {
        this.orderCreateForm.reset({
          user: this.userInfo,
          monthly_interest: 0,
          interest_type: this.interestTypes[0],
          ordered_on: new Date(),
          product: ''
        });
      }
      this.productSearch = this.orderCreateForm.get('product').valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.product_name.name)),
        map((name) => (name ? this._productFilter(name) : this.products.slice()))
      );

    });
  }

  private _productFilter(name: string) {
    if (!name) {
      return [];
    }
    const filterValue = name.toLowerCase();
    return this.products.filter((option) =>
      get(option, "product_name.name", '')
        .toLowerCase()
        .indexOf(filterValue) === 0);
  }

  compareWith(o1, o2) {
    if (!o1 || !o2) {
      return;
    }
    if (o1.id == o2.id) return true;
    else return false;
  }

  onDelete(element) {
    this.fs.delete(element).subscribe(
      (res) => res,
      (err) => console.log(err)
    );
  }

  productDisplayFn(product): string {
    if (!product) {
      return;
    }
    if (product && !get(product, "product_name.name", '')) {
      return '';
    }
    return product && product.product_name.name ? product.product_name.name : '';
  }


  onOptionSelect(product) {
    this.selectedProduct = product;
    this.orderCreateForm.get('monthly_interest').setValue(get(product, 'rate_of_interest', 0));
    this.orderCreateForm.get('interest_type').setValue(get(product, 'interest_type', {}));
  }


  onSubmit(event: Event) {
    event.preventDefault();
    if (this.orderCreateForm.valid && this.orderCreateForm.touched) {
      this.orderCreateForm.value.ordered_on = new Date(this.orderCreateForm.value.ordered_on).toISOString();
      const dataToServer = cloneDeep(this.orderCreateForm.value);
      this.fs.saveOrders(dataToServer).subscribe(
        (order) => {
          if (this.userInfo) {
            let transactionsDuplicate = (this.userInfo.combinedOrders || []) as Array<any>
            const index = this.order ? (transactionsDuplicate.findIndex((transaction) => transaction.id === this.order.id)) : -1;
            if (index >= 0) {
              transactionsDuplicate[index] = dataToServer;
            } else {
              transactionsDuplicate.push(order);
            }
            transactionsDuplicate = orderBy(transactionsDuplicate, function (o) {
              return new Date(o.ordered_on || o.paid_on);
            }, 'asc')
            this.userInfo.transactions = this.fs.getDetails(transactionsDuplicate);
            this.userInfo.totals = this.fs.getTotals(this.userInfo.transactions);
            this.appService.activeUser.next(this.userInfo);
          }
          this.router.navigateByUrl('/customers');
          this.snackBar.open('Data Saved Succesfully', 'Close', {
            duration: 2000,
          });
        },
        (error) => {
          console.log(error)
          this.snackBar.open(error.error.sqlMessage, 'Close', {
            duration: 2000,
            panelClass: ['waring-snackbar'],
          });
        }
      );
    }
  }

  onCancel(event: Event): void {
    event.preventDefault();
    void this.router.navigateByUrl('/customers');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.activatedRouteSub && this.activatedRouteSub.unsubscribe();
    this.orderCreateForm && this.orderCreateForm.reset();
  }
}
