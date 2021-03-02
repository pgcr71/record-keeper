import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { FinanceService } from '../user-transactions/finance.service';
import { cloneDeep, get } from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'backend/src/entities/order.entity';
import { SummaryService } from '../place-order/summary.service';
import { forkJoin } from 'rxjs';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  repayments: any;
  sumOfRepayments: any;
  isExcessCopy: number;
  repaymentsDataSource: MatTableDataSource<any>;
  userId: any;
  activatedRouteSub: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly is: FinanceService,
    private readonly snackBar: MatSnackBar,
    private readonly rs: SummaryService,
    private readonly as: AppService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.billingCreateForm = this.fb.group({
      price: [null, Validators.required],
      paid_on: [new Date(), Validators.required],
      comments: [''],
      user: ['', Validators.required]
    });

    this.activatedRouteSub = this.activatedRoute.queryParamMap.pipe(
      tap((params) => this.repayments = params.get('repaymentObj')),
      switchMap(() => this.as.activeUser)
    ).subscribe((userInfo) => {
      this.userInfo = userInfo;
      const parsedPayment = JSON.parse(this.repayments);
      if (this.repayments) {
        this.billingCreateForm.setControl('id', new FormControl(parsedPayment.id));
      }
      this.billingCreateForm.reset({ ...parsedPayment, user: this.userInfo })
    })
  }

  onSubmit() {

    if (this.billingCreateForm.valid) {
      const paidOn = new Date(this.billingCreateForm.get('paid_on').value).toISOString();
      const data = { ...this.billingCreateForm.value, paid_on: paidOn };
      this.is.saveRepayment(data).subscribe(
        (res) => {
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
  }
}


