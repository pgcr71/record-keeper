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
        this.loaderService.hide();
        this.users = [
          {
            "id": "0776bdc4-1cde-4b5a-be01-6626aa220783",
            "phone_number": "2312313131",
            "first_name": "anirudh",
            "last_name": "bichal",
            "updated_on": "2021-05-17T06:28:40.000Z",
            "transactions": [
              {
                "id": "04b9acff-0646-4f58-ba0c-26cb03b00c0a",
                "quantity": 2000,
                "monthly_interest": 2,
                "ordered_on": "2021-05-01T18:30:00.000Z",
                "comments": "for fun",
                "created_by": null,
                "created_on": "2021-05-17T06:29:07.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T06:47:40.000Z",
                "user": {
                  "phone_number": "2312313131",
                  "first_name": "anirudh",
                  "last_name": "bichal"
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 2000,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  1.32
                ],
                "paid_principal": [
                  0,
                  2000
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "dd3a962c-1cc2-4627-b8a9-7b9ba4aac54a",
                "quantity": 120000,
                "monthly_interest": 2,
                "ordered_on": "2021-05-01T18:30:00.000Z",
                "comments": null,
                "created_by": null,
                "created_on": "2021-05-17T06:48:27.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T06:48:44.000Z",
                "user": {
                  "phone_number": "2312313131",
                  "first_name": "anirudh",
                  "last_name": "bichal"
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 120000,
                "remaining_principal": 120000,
                "remaining_interest": 1183.56,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "b6112a07-628d-485c-9449-6549a1378f14",
                "price": 3000,
                "monthly_interest": 0,
                "comments": "123",
                "paid_on": "2021-05-02T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T06:29:55.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T06:29:55.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 3000,
                "remaining_principal": 998.68,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  2001.32
                ],
                "payment_status": "PARTIALLY_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 122000,
              "ordersTotalInterest": 1184.8799999999999,
              "repaymentsTotal": 3000,
              "repaymentsTotalInterest": 0,
              "remainingAmount": 120184.88
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          },
          {
            "id": "9ff7169b-2d2d-4d5b-9706-ea24565a4341",
            "phone_number": "7200157236",
            "first_name": "ganesh ",
            "last_name": "chandra ",
            "updated_on": "2021-05-17T04:19:02.000Z",
            "transactions": [
              {
                "id": "18c5f390-87b3-4dd1-bd7a-2fe6b8cb05e3",
                "price": 33131,
                "monthly_interest": 2,
                "comments": "334",
                "paid_on": "2021-05-03T18:30:00.000Z",
                "created_by": null,
                "created_on": "2021-05-17T04:26:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:24.000Z",
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "type": "repayment",
                "original_principal": 33131,
                "remaining_principal": 0,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  283.2
                ],
                "paid_principal": [
                  0,
                  33131
                ],
                "payment_status": "FULLY_PAID"
              },
              {
                "id": "9b9d90dd-0b44-4946-bc3e-ab65fd40ee6b",
                "quantity": 42423,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:19:06.353Z",
                "comments": "123",
                "created_by": null,
                "created_on": "2021-05-17T04:19:14.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:19:14.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 42423,
                "remaining_principal": 9008.8,
                "remaining_interest": 0,
                "paid_interest": [
                  0,
                  0
                ],
                "paid_principal": [
                  0,
                  33414.2
                ],
                "payment_status": "PARTIALLY_PAID"
              },
              {
                "id": "61582eb2-b15d-42be-8ca5-5ca8c634e3f1",
                "quantity": 23131,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:46.918Z",
                "comments": "231",
                "created_by": null,
                "created_on": "2021-05-17T04:25:54.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:25:54.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 23131,
                "remaining_principal": 23131,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              },
              {
                "id": "50372073-a00f-4499-bee4-58ea11ab4a9b",
                "quantity": 234242,
                "monthly_interest": 2,
                "ordered_on": "2021-05-17T04:25:56.381Z",
                "comments": "4242",
                "created_by": null,
                "created_on": "2021-05-17T04:26:02.000Z",
                "updated_by": null,
                "updated_on": "2021-05-17T04:26:02.000Z",
                "user": {
                  "phone_number": "7200157236",
                  "first_name": "ganesh ",
                  "last_name": "chandra "
                },
                "product": {
                  "id": "79a863eb-5546-4abe-be8b-0ff4d182b7a0",
                  "quantity": 0,
                  "unit_price": 1,
                  "rate_of_interest": 2,
                  "lot_number": 0,
                  "comments": null,
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z",
                  "product_name": {
                    "id": "b7a6f4f0-8df0-4655-8ba6-9e5c1fa2f2b2",
                    "name": "cash",
                    "description": "direct money transfer through cash or cheque or electronic modes",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  },
                  "interest_type": {
                    "id": 1,
                    "name": "simple",
                    "created_by": null,
                    "created_on": "2021-05-17T04:16:24.000Z",
                    "updated_by": null,
                    "updated_on": "2021-05-17T04:16:24.000Z"
                  }
                },
                "interest_type": {
                  "id": 1,
                  "name": "simple",
                  "created_by": null,
                  "created_on": "2021-05-17T04:16:24.000Z",
                  "updated_by": null,
                  "updated_on": "2021-05-17T04:16:24.000Z"
                },
                "original_principal": 234242,
                "remaining_principal": 234242,
                "remaining_interest": 0,
                "paid_interest": [
                  0
                ],
                "paid_principal": [
                  0
                ],
                "payment_status": "NOT_PAID"
              }
            ],
            "totals": {
              "ordersTotal": 299796,
              "ordersTotalInterest": 0,
              "repaymentsTotal": 33131,
              "repaymentsTotalInterest": 283.2,
              "remainingAmount": 266381.8
            }
          }
        ];
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
        const obj = {
          ...userInfo,
          transactions: this.financeService.getDetails([])
        };
        this.appService.activeUser.next(({ ...obj, totals: this.financeService.getTotals(obj.transactions) }));
      }
    })
  }

}
