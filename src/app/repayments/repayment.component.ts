import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { FinanceService } from '../user-transactions/finance.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SummaryService } from '../place-order/summary.service';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../inventory/inventory.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-repayment',
  templateUrl: './repayment.component.html',
  styleUrls: ['./repayment.component.scss']
})
export class RepaymentComponent implements OnInit {
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
  repayments: any = {};
  sumOfRepayments: any;
  isExcessCopy: number;
  repaymentsDataSource: MatTableDataSource<any>;
  userId: any;
  activatedRouteSub: any;
  interestTypes: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly is: FinanceService,
    private readonly snackBar: MatSnackBar,
    private readonly rs: SummaryService,
    private readonly as: AppService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly fs: InventoryService,
  ) { }

  ngOnInit(): void {
    this.billingCreateForm = this.fb.group({
      price: [null, Validators.required],
      paid_on: [new Date(), Validators.required],
      comments: [''],
      user: ['', Validators.required],
      monthly_interest: [0],
      interest_type: []

    });

    this.activatedRouteSub = this.as.activeTransaction$.pipe(
      tap((repayment) => this.repayments = repayment),
      switchMap(() => this.fs.getInterestTypes()),
      tap((interestTypes) => this.interestTypes = interestTypes),
      switchMap(() => this.as.activeUser),
    ).subscribe((userInfo) => {
      this.userInfo = userInfo;
      if (this.repayments) {
        this.billingCreateForm.setControl('id', new FormControl(this.repayments.id));
        this.billingCreateForm.reset({
          ...this.repayments,
          user: this.userInfo
        })
      } else {
        this.billingCreateForm.reset({
          user: this.userInfo,
          monthly_interest: 0,
          interest_type: this.interestTypes[0],
          paid_on: new Date()
        })
      }

    })
  }

  compareWith(o1, o2) {
    if (!o1 || !o2) {
      return;
    }
    if (o1.id == o2.id) return true;
    else return false;
  }

  onSubmit() {

    if (this.billingCreateForm.valid) {
      const paidOn = new Date(this.billingCreateForm.get('paid_on').value).toISOString();
      const billingDetails = cloneDeep(this.billingCreateForm.value);
      const data = { ...billingDetails, paid_on: paidOn, type: "repayment" };
      this.is.saveRepayment(data).subscribe(
        (res) => {
          if (this.userInfo) {
            const index = this.repayments ? (this.userInfo.transactions as Array<any>)
              .findIndex((transaction) => transaction.id === this.repayments.id) : -1;
            if (index >= 0) {
              this.userInfo.transactions[index] = data;
              this.userInfo.transactions = this.is.getDetails(this.userInfo.transactions);
              this.userInfo.totals = this.is.getTotals(this.userInfo.transactions);
            } else {
              this.userInfo.transactions.push(res);
              this.userInfo.transactions = this.is.getDetails(this.userInfo.transactions);
              this.userInfo.totals = this.is.getTotals(this.userInfo.transactions);
            }

          }
          this.snackBar.open('Data Saved Succesfully', 'Close', {
            duration: 2000,
          });
          this.router.navigateByUrl('/users');
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.activatedRouteSub && this.activatedRouteSub.unsubscribe();
    this.billingCreateForm && this.billingCreateForm.reset();
  }
}


