import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../finance.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { get } from 'lodash';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

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
  displayedColumns: string[] = ['date', 'youGave', 'youGot', 'repayments'];
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
  repaymentsTotal: any;
  ordersTotal: any;
  remainingAmount: number;
  ordersTotalInterest: any;
  repaymentsTotalInterest: any;
  totals: Partial<{ ordersTotal: any; ordersTotalInterest: any; repaymentsTotal: any; repaymentsTotalInterest: any; remainingAmount: number; }> = {};

  constructor(
    private is: FinanceService,
    private readonly as: AppService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.activeUserSubscription = this.as.activeUser.subscribe((userInfo) => {
      this.userId = userInfo && userInfo.id;
      this.combinedOrders = get(userInfo, "transactions", []);
      this.totals = get(userInfo, "totals", {});
    })
  }


  onRowClick(row) {
    this.as.activeTransaction.next(row);
    if (row.type == 'repayment') {
      this.router.navigate(['/customers/repayment']);
    } else {
      this.router.navigate(['/customers/orders']);
    }
  }

  redirectToOrdersPage() {
    this.as.activeTransaction.next(null);
    this.router.navigateByUrl('/customers/orders');
  }


  redirectToRepaymentsPage() {
    this.as.activeTransaction.next(null);
    this.router.navigateByUrl('/customers/repayment')
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.activeUserSubscription && this.activeUserSubscription.unsubscribe();
  }
}
