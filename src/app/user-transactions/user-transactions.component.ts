import { Component, OnInit } from '@angular/core';
import { FinanceService } from './finance.service';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { get, orderBy } from 'lodash';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AppService } from '../app.service';
export interface PeriodicElement {
  name: string;
  position: number;
  quantity: number;
  price: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserTransactionsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'youGave', 'youGot'];
  name = '';
  quantity = 0;
  price = 0;
  order = [];
  interestTypes = [];
  expandedElement;

  orderCreateForm: FormGroup;
  userSearch: Observable<Array<any>>;
  users = [];
  productSearch: Observable<Array<any>>;
  products = [];
  enableQuantity = false;
  maxDate = new Date();
  columns = []
  remainingStock: number;
  selectedProduct: void;
  stockInfo: { quantity: number; sold: number };
  editMode = false;
  orderCreateFormCopy: FormGroup;
  orderEditForm: FormGroup;
  orderEditFormCopy: FormGroup;
  length: number;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 100];
  userId: string;
  repayments: any;
  combinedOrders: any;
  repaymentIDs: any;
  savings: any;
  repaymentsAndSavings: any[];
  activeUserSubscription: any;
  savingsWithOutRepayments: any;

  constructor(
    private is: FinanceService,
    private snackBar: MatSnackBar,
    private readonly as: AppService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.activeUserSubscription = this.as.activeUser.subscribe((userInfo) => {
      this.userId = userInfo && userInfo.id;
      forkJoin(
        [
          this.is.getAllUserOrders(this.userId, null, null),
          this.is.getUserRepaymentDetails(this.userId, null, null),
          this.is.getUserSavings(this.userId)
        ]
      )
        .subscribe((result) => {
          this.order = orderBy(get(result, '[0].orders', []) || [], function (o) { return new Date(o.ordered_on || o.paid_on); }, 'desc');
          this.repayments = (get(result, '[1]', []) || []).map(rp => ({ ...rp, ordered_on: rp.paid_on, type: 'repayment' }));
          this.savings = (get(result, '[2]', []) || []);
          this.savingsWithOutRepayments = (get(result, '[2]', []) || []).filter(sv => !sv.repayment);
          this.repaymentsAndSavings = orderBy([...this.repayments, ...this.savingsWithOutRepayments], function (obj) { return obj.ordered_on }, 'desc');
          this.combinedOrders = orderBy([...this.order, ...this.repayments], function (obj) { return obj.ordered_on }, 'desc');
          this.repaymentIDs = this.repaymentsAndSavings.map(re => re.id);
          this.columns = ["orders", ...this.repaymentIDs, "youGet"];
        });
    })
  }

  getWhatYouGet() {
    const totalRemainingRepayments = this.order.reduce((acc, next) => acc + Number(next.remaining_pricipal_debt) + Number(next.remaining_interest_debt), 0);
    const totalSavings = this.savings.reduce((acc, next) => acc + Number(next.price), 0)

    return Number(totalRemainingRepayments) + Number(totalSavings);
  }

  getMatchedRepayment(id: string, order) {
    if (!id) {
      return;
    }
    const repayments = get(order, "repayments", []) || [];
    const filtered = repayments.filter((rp) => get(rp, "payment.id", '') === id);
    return filtered.length ? `${filtered[0].principal_amount} + ${filtered[0].interest_amount}` : '';
  }

  onPageNumberClick(pageInfo: { pageIndex: number; pageSize: number; previousPageIndex: number; length: number }) {
    const noOfRecordsFetchedAlready = pageInfo.pageIndex * pageInfo.pageSize;
    this.is.getOrders(noOfRecordsFetchedAlready, pageInfo.pageSize).subscribe((result) => {
      this.order = get(result, '[0]', []) || [];
    });
  }

  resetForm(element) {
    this.editMode = false;
  }


  onRowClick(row) {
    if (row.type == 'repayment') {
      this.router.navigate(['repayment'], { queryParams: { repaymentObj: row } });
    } else {
      this.router.navigate(['orders'], { queryParams: { orderObj: JSON.stringify(row) } })
    }
  }

  redirectToOrdersPage() {
    this.router.navigateByUrl('/orders');
  }


  redirectToRepaymentsPage() {
    this.router.navigateByUrl('/repayment')
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.activeUserSubscription && this.activeUserSubscription.unsubscribe();
  }
}
