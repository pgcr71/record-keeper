import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { get, orderBy, set } from 'lodash';
import { forkJoin, of } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { FinanceService } from 'src/app/shared/customers/finance.service';
import { LoaderService } from '../../loader/loader.service';
import { AddUserComponent } from '../add-user/add-user.component';


@Component({
  selector: 'app-recent-users',
  templateUrl: './recent-users.component.html',
  styleUrls: ['./recent-users.component.scss']
})
export class RecentUsersComponent implements OnInit {
  users = [];
  _selectedUser: any;
  @Output() selectedUser = new EventEmitter()
  userId: any;
  usersCopy: any = [];
  total = {
    remainingAmount: 0,
    youWillGet: 0,
    youWillGive: 0
  };
  showLoader = false;

  constructor(
    private readonly financeService: FinanceService,
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly appService: AppService,
    private readonly loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.getUsers();
    this.appService.activeUser$.subscribe((user) => {
      if (user) {
        const matchedIndex = this.users.findIndex((usr) => user.id === usr.id);
        if (matchedIndex === -1) {
          const obj = {
            ...user,
            transactions: this.financeService.getDetails([])
          };
          this._selectedUser = ({ ...obj, totals: this.financeService.getTotals(obj.transactions) });
          this.users.unshift(user);
          this.appService.allUsers.next(this.users);
        } else {
          this._selectedUser = user;
        }
      }
    });
  }

  getUsers() {
    this.financeService.getAllUsers()
      .pipe(
        switchMap((users) =>
          this.getUserTransactionDetails(users)
        )
      )
      .subscribe((user) => {
        this.usersCopy.push(user);
      }, err => err, () => {
        this.users = this.usersCopy;
        this.users = orderBy(this.users, usr => usr.updated_on, 'desc');
        this.appService.allUsers.next(this.users);
        this._selectedUser = this.users[0];
        this.appService.activeUser.next(this.users[0])
        this.selectedUser.emit(this._selectedUser);
        this.loaderService.hide()
      })
  }

  getUserTransactionDetails(users) {
    return of(...users).pipe(
      mergeMap(user =>
        forkJoin(
          [
            this.financeService.getAllUserOrders(user.id, null, null),
            this.financeService.getUserRepaymentDetails(user.id, null, null)
          ]
        ).pipe(
          map(
            (transactions) => {
              const order = orderBy(get(transactions, '[0]', []) || []);
              let repayments = orderBy(get(transactions, '[1]', []) || []);
              repayments = repayments.map(payment => {
                set(payment, 'type', "repayment"); return payment
              });
              const combinedOrders = orderBy([...order, ...repayments], function (o) {
                return new Date(o.ordered_on || o.paid_on);
              }, 'asc');
              const obj = {
                ...user,
                transactions: this.financeService.getDetails(combinedOrders),
              }
              return ({ ...obj, totals: this.financeService.getTotals(obj.transactions) });
            }
          )
        )
      )
    )
  }

  redirectToUserOrdersPage(userInfo) {
    this._selectedUser = userInfo;
    this.appService.activeUser.next(userInfo);
    this.router.navigateByUrl('/customers');
  }

  getTotals() {
    const totals = {
      remainingAmount: 0,
      youWillGet: 0,
      youWillGive: 0
    }
    this.users.forEach((next) => {
      totals.remainingAmount += get(next, "totals.remainingAmount", 0);
      totals.youWillGet += get(next, "totals.ordersTotal", 0) + get(next, "totals.ordersTotalInterest", 0);
      totals.youWillGive += get(next, "totals.repaymentsTotal", 0), + get(next, "totals.repaymentsTotalInterest", 0);
    });
    this.total = totals;
    return totals;
  }

  addNewUser() {
    const dialog = this.matDialog.open(AddUserComponent);


    dialog.afterClosed().subscribe((userInfo) => {
      if (userInfo) {
        this.appService.activeUser.next(userInfo);
      }
    })
  }

}
