import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { get } from 'lodash';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FinanceService } from '../finance/finance.service';
import { SummaryService } from './summary.service';

@Component({
  selector: 'app-repayments',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SummaryComponent implements OnInit {
  repaymentForm: FormGroup;
  userSearch: Observable<any>;
  maxDate: Date = new Date();
  users = [];
  expandedElement: any | null;
  repayments: any;
  userInfo: any;
  billingDetails: any;
  dataSource: any;
  totalPrincipal: any;
  totalInterest: any;
  totalDebt: any;
  billingCreateForm: any;
  oneYearBeforeFromToday: Date;
  totalRemainingDebt: number;
  today: Date = new Date();
  displayedColumns = [
    'period',
    'productInfo',
    'previousPayments',
    'remainingpricipal',
    'remainingInterest',
    'totalRemaining',
  ];
  previousPaymentsColumns = ['paymentDate', 'price'];
  subPaymentsColumns = ['paymentDate', 'price', 'orderDetails'];
  previousPaidPayments: any;
  totalPrincipalRemaining: any;
  totalinteresetRemaining: any;
  constructor(
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly rs: SummaryService,
    private readonly fs: FinanceService
  ) {}

  ngOnInit(): void {
    this.oneYearBeforeFromToday = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    this.repaymentForm = this.fb.group({
      user: [null, [Validators.required]],
      start_date: [this.oneYearBeforeFromToday, [Validators.required]],
      end_date: [this.today, Validators.required],
    });

    this.fs.getAllUsers().subscribe((users) => {
      this.users = users;
      this.repaymentForm.get('user').setValue('');
      this.getUserOrders(this.users[1]);
    });

    this.userSearch = this.repaymentForm.get('user').valueChanges.pipe(
      startWith(''),
      map((value) => value && (typeof value === 'string' ? value : value['first_name'] + ' ' + value['last_name'])),
      map((name) => (name ? this._userFilter(name) : this.users.slice()))
    );
  }

  private _userFilter(name: string) {
    const filterValue = name.toLowerCase();
    return this.users.filter(
      (option) =>
        option['first_name'].toLowerCase().includes(filterValue) ||
        option['last_name'].toLowerCase().includes(filterValue) ||
        option['phone_number'].toLowerCase().includes(filterValue) ||
        (option['first_name'] + ' ' + option['last_name']).toLowerCase().indexOf(filterValue) === 0
    );
  }

  userDisplayFn(user): string {
    return user && user['first_name'] + user['last_name'] ? user['first_name'] + ' ' + user['last_name'] : '';
  }

  onOptionClick(userInfo) {
    this.userInfo = userInfo;
    this.getUserOrders(userInfo, this.oneYearBeforeFromToday, this.today);
  }

  getUserOrders(userInfo, date?: Date, endDate?: Date) {
    if (userInfo && userInfo.id) {
      this.fs.getUserRepaymentDetails(userInfo.id).subscribe((repayments) => {
        this.repayments = repayments;
      });
      this.fs.getAllUserOrders(userInfo && userInfo.id, null, endDate, true).subscribe((data: Array<object>) => {
        this.billingDetails = get(data, 'orders', []).map((result) => this.formatData(result));
        this.dataSource = new MatTableDataSource<any>(this.billingDetails);
        this.totalPrincipal = this.billingDetails.reduce((acc, next) => acc + next.initial_cost, 0);
        this.totalInterest = this.billingDetails.reduce((acc, next) => acc + next.interest_accrued, 0);
        this.totalDebt = this.billingDetails.reduce((acc, next) => acc + next.total_debt, 0);
        this.totalinteresetRemaining = this.billingDetails.reduce((acc, next) => acc + next.remaining_interest_debt, 0);
        this.totalPrincipalRemaining = this.billingDetails.reduce(
          (acc, next) => acc + next.remaining_principal_debt,
          0
        );
        //this.totalRemainingDebt = this.billingDetails.reduce((acc, next) => acc + next.remaining_amount, 0) + this.totalInterest;
        this.previousPaidPayments = this.billingDetails.reduce(
          (acc, element) =>
            acc +
            Number(
              get(element, 'repayments', []).reduce(
                (acc, next) => acc + Number(next.principal_amount) + Number(next.interest_amount),
                0
              )
            ),
          0
        );
      });
    }
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
      repayments: get(results, 'repayments', {}),
      payment_status: get(results, 'payment_status.id', null),
      paid_amount: 0,
      remaining_principal_debt: Number(get(results, 'remaining_pricipal_debt', 0)) || 0,
      remaining_interest_debt: Number(get(results, 'remaining_interest_debt', 0)) || 0,
      interest_accrued: Number(
        get(results, 'interest_on_compound_period', 0) + get(results, 'interest_for_remaining_days', 0)
      ),
      total_debt: Number(get(results, 'total_debt', 0)),
    };
  }

  onSubmit() {
    if (this.repaymentForm.valid) {
      this.getUserOrders;
    }
  }
}
