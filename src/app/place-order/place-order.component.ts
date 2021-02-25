import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { FinanceService } from '../user-transactions/finance.service';
import { RequireMatch } from '../shared/validators/require-match.validator';

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

  constructor(
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly fs: FinanceService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.orderCreateForm = this.fb.group({
      product: ['', [Validators.required, RequireMatch]],
      quantity: [null, [Validators.required]],
      ordered_on: [new Date(), [Validators.required]],
      comments: [''],
    });

    this.activatedRoute.queryParamMap.pipe(
      tap((params) => this.order = params.get('orderObj')),
      switchMap(() => this.fs.getAllProducts())
    ).subscribe((products) => {
      this.products = products;
      if (this.order) {
        const parsedOrder = JSON.parse(this.order);
        this.orderCreateForm.setControl('id', new FormControl(parsedOrder.id));
        this.orderCreateForm.reset(parsedOrder);
      }
      this.productSearch = this.orderCreateForm.get('product').valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.name)),
        map((name) => (name ? this._productFilter(name) : this.products.slice()))
      );
    });
  }

  private _productFilter(name: string) {
    const filterValue = name.toLowerCase();
    return this.products.filter((option) => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onDelete(element) {
    this.fs.delete(element).subscribe(
      (res) => res,
      (err) => console.log(err)
    );
  }

  productDisplayFn(product): string {
    if (product && !product.name) {
      return '';
    }
    return product && product.name ? product.name : '';
  }


  onOptionSelect(product) {
    this.selectedProduct = product;
  }


  onSubmit(event: Event) {
    event.preventDefault();
    if (this.orderCreateForm.valid && this.orderCreateForm.touched) {
      this.orderCreateForm.value.ordered_on = new Date(this.orderCreateForm.value.ordered_on).toISOString();
      this.fs.saveOrders(this.orderCreateForm.value).subscribe(
        () => {
          this.snackBar.open('Data Saved Succesfully', 'Close', {
            duration: 2000,
          });
        },
        (error) => {
          this.snackBar.open(error.error.sqlMessage, 'Close', {
            duration: 2000,
            panelClass: ['waring-snackbar'],
          });
        }
      );
    }
  }
}
