import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { FinanceService } from '../user-transactions/finance.service';
import { cloneDeep, get, result } from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'backend/src/entities/order.entity';
import { SummaryService } from '../place-order/summary.service';
import { RequireMatch } from '../shared/validators/require-match.validator';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { forkJoin } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BillingComponent implements OnInit {
  billingCreateForm: FormGroup;
  userSearch: Observable<Array<any>>;
  users = [];
  billingDetails: Array<{
    id: any;
    quantity: any;
    product_name: any;
    unit_price: any;
    rate_of_interest: any;
    interest_type: any;
    lot_number: any;
    initial_cost: any;
    days_since_purchase: any;
    ordered_on: any;
    created_on: any;
    today: Date;
    remaining_amount: number;
    remaining_interest_debt: number;
    remaining_amount_copy: number;
    paid_amount: number;
    total_debt: number;
  }> = [];
  displayedColumns = ['select', 'period', 'productInfo', 'interestDetails', 'totalDebt', 'debts', 'remainingAmount'];
  repaymentColumns = ['userInfo']
  totalPrincipal: number;
  totalInterest: number;
  totalDebt: number;
  dataSource = new MatTableDataSource<any>(this.billingDetails);
  selection = new SelectionModel<any>(true, []);
  maxDate = new Date();
  userInfo: any;
  totalRemainingDebt: any;
  cantBeNegetive: boolean;
  totalPaid: number;
  expandedElement
  editMode: boolean;
  billingEditForm: FormGroup;
  billingEditFormCopy: FormGroup;
  isExcess: number;
  repayments: any;
  sumOfRepayments: any;
  isExcessCopy: number;
  repaymentsDataSource: MatTableDataSource<any>;
  userId: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly is: FinanceService,
    private readonly snackBar: MatSnackBar,
    private readonly rs: SummaryService,
    private readonly as: AppService
  ) { }

  ngOnInit(): void {
    this.billingCreateForm = this.fb.group({
      price: [null, Validators.required],
      paid_on: [new Date(), Validators.required],
      comments: [''],
    });

    this.as.activeUser.subscribe((user) => {
      if (user) {
        this.userInfo = user;
        this.userId = user.id;
        console.log(this.billingCreateForm)
        this.recalculate(this.userInfo);
        this.calculateRemaining(0)
      }
    });

    this.billingCreateForm.get('paid_on').valueChanges.subscribe((value) => {
      this.recalculate(this.userInfo);
    });

    this.billingCreateForm
      .get('price')
      .valueChanges.pipe(debounceTime(500))
      .subscribe((value) => this.calculateRemaining(value));

  }

  calculateRemaining(amount) {
    if (!amount) {
      return;
    }

    this.isExcess = this.isExcessCopy || 0;
    this.selection.clear();
    const user = this.userInfo
    if (!user) {
      return;
    }

    if (!this.billingDetails.length) {
      this.isExcess = Number(this.isExcessCopy) + Number(amount);
      this.calculateTotalRemainingDebt();
      this.calculateTotalDebt();
      return;
    }
    let sum = 0;
    let sumOfFiltered = 0;
    const filteredResults = this.billingDetails.filter((row) => {
      let include = false;
      row['principalToBeDebited'] = 0;
      row['interestToBeDebited'] = 0;
      row['remainingPrincipalTobePaid'] = row['remaining_principal_debt'];
      row['remainingInterestTobePaid'] = row['remaining_interest_debt'];
      row['remaining_principal_debt'] = row['remaining_principal_debt_copy'];
      row['remaining_interest_debt'] = row['remaining_interest_debt_copy'];
      row.remaining_amount = row.remaining_amount_copy;
      const diff = sum - Number(amount);
      if (diff <= 0) {
        include = true;
        row.remaining_amount = 0;

        sumOfFiltered = sumOfFiltered + Number(row.remaining_amount_copy);

        if (row.interest_type === 'compound') {
          this.calculateCompoundInterest(
            row,
            this.billingCreateForm.get('paid_on').value,
            Number(row.remaining_amount_copy)
          );
        } else {
          this.calculateSimpleInterest(
            row,
            this.billingCreateForm.get('paid_on').value,
            Number(row.remaining_amount_copy)
          );
        }
      }

      sum = row.remaining_amount_copy + sum;
      return include;
    });

    const last = filteredResults.length - 1;
    if (last > -1) {
      console.log('sumOfFiltered', sumOfFiltered, "filteredResult ", cloneDeep(filteredResults[last].remaining_amount_copy))
      const sumExcludingLastResult = sumOfFiltered - filteredResults[last].remaining_amount_copy;
      const remainingAmount = amount - sumExcludingLastResult;

      const isExcess = remainingAmount - filteredResults[last].remaining_amount_copy;
      if (isExcess > 0) {
        this.isExcess = isExcess;
        filteredResults[last]['principalToBeDebited'] = filteredResults[last]['remaining_principal_debt'];
        filteredResults[last]['interestToBeDebited'] = filteredResults[last]['remaining_interest_debt'];
        filteredResults[last]['remainingPrincipalTobePaid'] = 0;
        filteredResults[last]['remainingInterestTobePaid'] = 0;
      }

      else if (filteredResults[last].interest_type === 'compound') {
        this.calculateCompoundInterest(
          filteredResults[last],
          this.billingCreateForm.get('paid_on').value,
          Number(remainingAmount)
        );
      } else {
        this.calculateSimpleInterest(
          filteredResults[last],
          this.billingCreateForm.get('paid_on').value,
          Number(remainingAmount)
        );
      }
      this.calculateTotalDebt();
      this.calculateTotalRemainingDebt();

    }

    this.selection.deselect(...this.billingDetails);
    this.selection.select(...filteredResults);
  }

  calculateSimpleInterest(result: any, date?: Date | string | number, amount?: number) {
    result['principalToBeDebited'] = 0;
    result['interestToBeDebited'] = 0;
    result['remainingPrincipalTobePaid'] = result['remaining_principal_debt'];
    result['remainingInterestTobePaid'] = result['remaining_interest_debt'];
    const oneDay = 24 * 60 * 60 * 1000;
    const date1 = new Date(result.ordered_on).setHours(23, 59, 59, 999);
    const date2 = date ? new Date(date).setHours(23, 59, 59, 999) : new Date().setHours(23, 59, 59, 999);
    const days_since_purchase = Math.round(Math.abs((date1 - date2) / oneDay));
    const interestRate = result.rate_of_interest;
    result['principalToBeDebited'] = (amount / (1 + (days_since_purchase * 12 * interestRate) / 36500)).toFixed(2);
    result['interestToBeDebited'] = (amount - result['principalToBeDebited']).toFixed(2);
    result['remainingPrincipalTobePaid'] = (
      result['remaining_principal_debt'] - result['principalToBeDebited']
    ).toFixed(2);
    result['remainingInterestTobePaid'] = (result['remaining_interest_debt'] - result['interestToBeDebited']).toFixed(
      2
    );

    return result;
  }

  calculateCompoundInterest(result: any, date?: Date | string | number, amount?: number): Order {
    result['principalToBeDebited'] = 0;
    result['interestToBeDebited'] = 0;
    result['remainingPrincipalTobePaid'] = 0;
    result['remainingInterestTobePaid'] = 0;
    const oneDay = 24 * 60 * 60 * 1000;
    const date1 = new Date(result.ordered_on).setHours(23, 59, 59, 999);
    const date2 = date ? new Date(date).setHours(23, 59, 59, 999) : new Date().setHours(23, 59, 59, 999);
    const days_since_purchase = Math.round(Math.abs((date1 - date2) / oneDay));
    const interestRate = result.rate_of_interest;
    const compoundingPeriodInDays = 365;
    const timesToCompound = Math.floor(days_since_purchase / compoundingPeriodInDays);
    const compoundingMonthsPerYear = Math.floor(365 / compoundingPeriodInDays);
    const remaining_days = days_since_purchase - timesToCompound * compoundingPeriodInDays;
    result['principalToBeDebited'] = (
      amount /
      (Math.pow(1 + (interestRate * 12) / (compoundingMonthsPerYear * 100), timesToCompound) *
        (1 + (remaining_days * interestRate * 12) / 36500))
    ).toFixed(2);
    result['interestToBeDebited'] = (amount - result['principalToBeDebited']).toFixed(2);
    result['remainingPrincipalTobePaid'] = (
      result['remaining_principal_debt'] - result['principalToBeDebited']
    ).toFixed(2);
    result['remainingInterestTobePaid'] = (result['remaining_interest_debt'] - result['interestToBeDebited']).toFixed(
      2
    );

    return result;
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onOptionClick(userInfo) {
    this.userInfo = userInfo;
    this.recalculate(userInfo);
  }

  calculateTotalRemainingDebt() {
    this.totalRemainingDebt = this.billingDetails.reduce(
      (acc, next) => acc + Number(next['remainingPrincipalTobePaid']) + Number(next['remainingInterestTobePaid']),
      0
    );
  }

  calculateTotalDebt() {
    this.totalPaid = this.billingDetails.reduce(
      (acc, next) => acc + Number(next['principalToBeDebited']) + Number(next['interestToBeDebited']),
      0
    );
  }

  recalculate(userInfo) {
    const arrOfRequests = [
      this.getUserOrders(userInfo, null, this.billingCreateForm.get('paid_on').value),
      this.getRepayments(userInfo),
      this.getUserSavings(userInfo)
    ]
    forkJoin(arrOfRequests).subscribe(arr => {
      this.repayments = get(arr, "[1]", []) || [];
      this.sumOfRepayments = this.repayments.reduce((acc, next) => acc + next.price, 0);
      this.billingDetails = get(arr, '[0].orders', []).map((result) => this.formatData(result));
      this.isExcess = (get(arr, "[2]", []) || []).reduce((acc, result) => acc + Number(result.price), 0);
      this.isExcessCopy = this.isExcess;
      this.dataSource = new MatTableDataSource<any>(this.billingDetails);
      this.repaymentsDataSource = new MatTableDataSource<any>(this.repayments);
      this.totalPrincipal = this.billingDetails.reduce((acc, next) => acc + next.initial_cost, 0);

      //total interest
      this.totalInterest = this.billingDetails.reduce((acc, next) => acc + next.remaining_interest_debt, 0);

      // debt after removing previously paid
      this.totalDebt = this.billingDetails.reduce((acc, next) => acc + next.total_debt, 0);
      this.calculateRemaining(this.billingCreateForm.get('price').value);
    })

  }

  getRepayments(userInfo) {
    return this.is.getUserRepaymentDetails(userInfo.id);
  }

  getUserOrders(userInfo, date: Date, endDate?: Date) {
    return this.is.getAllUserOrders(userInfo && userInfo.id, date, endDate, false);
  }

  getUserSavings(userInfo) {
    return this.is.getUserSavings(userInfo)
  }

  formatData(results) {
    return {
      id: get(results, 'id', ''),
      quantity: get(results, 'quantity', 0),
      comments: get(results, 'comments', ''),
      product_name: get(results, 'product.name', 0),
      unit_price: Number(get(results, 'product.unit_price', 0)),
      rate_of_interest: Number(get(results, 'product.rate_of_interest', 0)),
      interest_type: get(results, 'product.interest_type.name', 0),
      lot_number: get(results, 'product.lot_number', 0),
      initial_cost: Number(get(results, 'initial_cost', 0)),
      days_since_purchase: Number(get(results, 'days_since_purchase', 0)),
      created_on: get(results, 'created_on', 0),
      ordered_on: get(results, 'ordered_on', 0),
      today: new Date(),
      remaining_principal_debt: Number(get(results, 'remaining_pricipal_debt', 0)) || 0,
      remaining_principal_debt_copy: Number(get(results, 'remaining_pricipal_debt', 0)) || 0,
      remaining_interest_debt: Number(get(results, 'remaining_interest_debt', 0)) || 0,
      remaining_interest_debt_copy: Number(get(results, 'remaining_interest_debt', 0)) || 0,
      remaining_amount_copy: Number(get(results, 'total_debt', 0)),
      paid_amount: 0,
      payment_status: get(results, 'payment_status', {}),
      total_debt: Number(get(results, 'total_debt', 0)),
    };
  }

  resetForm(element) {
    this.editMode = false;
  }

  setFormData(data) {
    this.editMode = true;
    this.billingEditForm = this.fb.group({
      price: [data.price, Validators.required],
      paid_on: [data.ordered_on, [Validators.required]],
      comments: [data.comments],
      id: [data.id],
    });

    this.billingEditFormCopy = cloneDeep(this.billingEditFormCopy);
  }

  onDelete(element) {
    this.is.delete(element).subscribe(
      (res) => {
        this.billingDetails = this.billingDetails.filter((el) => el.id !== element.id);
      },
      (err) => console.log(err)
    );
  }

  updateData(element) {
    this.is.updateOrders(this.billingCreateForm.value).subscribe(
      (res) => {
        this.editMode = false;
        this.billingDetails = this.billingDetails.map((el) => (el.id === res.id ? res : el));
      },
      (err) => console.log(err)
    );
  }


  onSubmit() {
    if (this.billingCreateForm.get('price').value < 0) {
      this.cantBeNegetive = true;
      this.billingCreateForm.controls['price'].setErrors({ negetiveValue: true });
      return;
    }

    if (this.billingCreateForm.valid) {
      const paidOn = this.billingCreateForm.get('paid_on') && this.billingCreateForm.get('paid_on').value.toISOString();
      const data = { ...this.billingCreateForm.value, paid_on: paidOn };
      this.rs.add(data, this.selection.selected, this.isExcess - this.isExcessCopy).subscribe(
        (res) => {
          this.billingCreateForm.reset({
            user: this.userInfo,
            price: null,
            paid_on: new Date(),
          });
          this.snackBar.open('Data Saved Succesfully', 'Close', {
            duration: 2000,
          });
        },
        (error) => {
          console.log(error);
          this.snackBar.open(error.error.sqlMessage, 'Close', {
            duration: 2000,
            panelClass: ['waring-snackbar'],
          });
        }
      );
    }
  }
}


