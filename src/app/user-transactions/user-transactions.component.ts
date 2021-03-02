import { Component, OnInit } from '@angular/core';
import { FinanceService } from './finance.service';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { cloneDeep, get, orderBy, set } from 'lodash';
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
  styleUrls: ['./user-transactions.component.scss']
})
export class UserTransactionsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'youGave', 'youGot', 'repayments', 'remainingAmount'];
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
  repaymentsCopy: any[];
  ordersCopy: any[];

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
          this.is.getUserRepaymentDetails(this.userId, null, null)
        ]
      )
        .subscribe((result) => {
          this.order = orderBy(get(result, '[0]', []) || [], function (o) { return new Date(o.ordered_on); }, 'asc');
          this.repayments = orderBy(get(result, '[1]', []) || [], function (o) { return new Date(o.paid_on); }, 'asc');
          this.repayments = this.repayments.map(payment => { payment["type"] = 'repayment'; return payment })
          this.combinedOrders = this.getDetails(this.order, this.repayments);
        });
    })
  }

  getDetails(orders: Array<any>, repayments: Array<any>) {
    let details = [];
    if (repayments && repayments.length) {
      repayments.forEach((payment) => {
        details = [payment, ...orderBy(cloneDeep(this.is.calculateRemaining(payment, orders)), (o) => o.ordered_on, 'desc'), ...details];
      });
    }

    let excessSum = 0
    repayments.forEach((payment) => {
      if (payment["excess_amount"]) {
        excessSum = excessSum + payment["excess_amount"];
        payment["sum_of_previous_excess"] = excessSum;
      }
    });
    let sum = 0;
    const newOrders = orders.filter((ordr) => {
      set(ordr, 'paid_principal', 0);
      set(ordr, 'paid_interest', 0);
      set(ordr, "current_principal", get(ordr, "remaining_principal", ordr.original_principal));
      const orderInterestType = get(ordr, "product.interest_type.name", '');
      const monthlyInterestRate = get(ordr, "product.rate_of_interest", 2);
      if (ordr["payment_status"] === 'PARTIALLY_PAID') {
        const interestAccured = orderInterestType === 'compound' ?
          this.is.calculateCompoundInterest(ordr["remaining_principal"], monthlyInterestRate, 365, ordr.ordered_on) :
          this.is.calculateSimpleInterest(ordr["remaining_principal"], monthlyInterestRate, ordr.ordered_on)
        set(ordr, 'interestAccured', Number(interestAccured.toFixed(2)));
        ordr["paid_interest"] = interestAccured;
        sum = sum + ordr["paid_interest"] + ordr["current_principal"];
        ordr["sum_of_previous"] = sum;
        return true;
      }

      if (ordr["payment_status"] === "NOT_PAID" || !ordr["payment_status"]) {
        ordr["payment_status"] = ordr["payment_status"] || 'NOT_PAID';
        const orderInterestType = get(ordr, "product.interest_type.name", '');
        const monthlyInterestRate = get(ordr, "product.rate_of_interest", 2);
        set(ordr, "original_principal", get(ordr, "product.unit_price", 0) * get(ordr, "quantity", 0));
        set(ordr, "current_principal", get(ordr, "remaining_principal", ordr.original_principal))
        const interestAccured = orderInterestType === 'compound' ?
          this.is.calculateCompoundInterest(ordr["current_principal"], monthlyInterestRate, 365, ordr.ordered_on) :
          this.is.calculateSimpleInterest(ordr["current_principal"], monthlyInterestRate, ordr.ordered_on)
        set(ordr, 'interestAccured', Number(interestAccured.toFixed(2)));
        ordr["paid_interest"] = interestAccured;
        sum = sum + ordr["paid_interest"] + ordr["current_principal"];
        ordr["sum_of_previous"] = sum;

        return true;
      }
      return false;
    });

    return orderBy([...orderBy(newOrders, (o) => o.paid_on || o.ordered_on, "desc"), ...details])
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
      this.router.navigate(['repayment'], { queryParams: { repaymentObj: JSON.stringify(row) } });
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
