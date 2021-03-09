import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { get, orderBy, set } from 'lodash';
import { forkJoin, of } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { FinanceService } from 'src/app/user-transactions/finance.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { AppService } from '../app.service';

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

  constructor(
    private readonly financeService: FinanceService,
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly appService: AppService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.appService.activeUser$.subscribe((user) => {
      if (user) {
        const matchedIndex = this.users.findIndex((usr) => user.id === usr.id);
        if (matchedIndex === -1) {
          set(user, "transactions", []);
          set(user, "totals", {})
          this.users.unshift(user);
          this.appService.allUsers.next(this.users);

        }
        this._selectedUser = user;
      }
    });
  }

  getUsers() {
    this.financeService.getAllUsers()
      .pipe(switchMap((users) => this.getUserTransactionDetails(users)))
      .subscribe((user) => {
        this.usersCopy.push(user);
      }, err => err, () => {
        this.users = this.usersCopy;
        this.users = orderBy(this.users, usr => usr.updated_on, 'desc');
        this.appService.allUsers.next(this.users);
        this._selectedUser = this.users[0];
        this.selectedUser.emit(this._selectedUser);
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
    this.selectedUser.emit(userInfo);
    this.router.navigateByUrl('/users');
  }

  getTotals() {
    return this.users.reduce((sum, nextUser) => sum + get(nextUser, "totals.remainingAmount", 0), 0)
  }
}
