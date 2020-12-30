import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FinanceService } from '../finance/finance.service';
import { get } from 'lodash'

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  billingCreateForm: FormGroup;
  userSearch:  Observable<Array<any>>;
  users = [];
  billingDetails:  Array<{
    id: any;
    quantity: any;
    product_name: any;
    unit_price: any;
    rate_of_interest: any;
    interest_type: any;
    lot_number: any;
    initial_cost: any;
    days_since_purchase: any;
    ordered_on: any,
    created_on: any;
    today: Date;
    interest_accrued: any;
    total_debt
   }> = [];
  displayedColumns = ['period', 'productInfo',  'interestDetails',  'totalDebt']
  totalPrincipal: number;
  totalInterest: number;
  totalDebt: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly is: FinanceService
  ) { }

  ngOnInit(): void {
    this.billingCreateForm = this.fb.group({
      user: ['', Validators.required]
    });

    this.is.getAllUsers().subscribe((users) => {
      this.users = users;
      this.billingCreateForm.get('user').setValue('')
    });

    this.userSearch = this.billingCreateForm.get('user').valueChanges
    .pipe(
      startWith(''),
      map(value => value && (typeof value === 'string' ? value : value['first_name'] + " " + value['last_name'])),
      map(name => name ? this._userFilter(name) : this.users.slice())
    );

  }

  userDisplayFn(user): string {
    console.log(user);
    return (user && (user['first_name'] + user['last_name'])) ? user['first_name'] + " " + user['last_name'] : '';
  }


  private _userFilter(name: string) {
    const filterValue = name.toLowerCase();

    return this.users.filter(option =>
      (option['first_name'].toLowerCase()).includes(filterValue) ||
       (option['last_name'].toLowerCase()).includes(filterValue) ||
       (option['phone_number'].toLowerCase()).includes(filterValue) ||
       (option['first_name'] +" "+ option['last_name']).toLowerCase().indexOf(filterValue) === 0
       );
  }

  onOptionClick(userInfo) {
    this.getUserOrders(userInfo);
  }

  getUserOrders(userInfo) {
    this.is.getAllUserOrders(userInfo.id).subscribe((data: Array<object>) => {
     this.billingDetails = data.map(result => this.formatData(result));
      this.totalPrincipal = this.billingDetails.reduce((acc, next) => acc + next.initial_cost, 0);
      this.totalInterest = this.billingDetails.reduce((acc, next) => acc + next.interest_accrued, 0);
      this.totalDebt = this.billingDetails.reduce((acc, next) => acc + next.total_debt, 0);
    })
  }

  formatData(results) {
    return {
      'id': get(results, 'id', ''),
      'quantity': get(results, 'quantity', 0),
      "product_name": get(results, 'product.name', 0),
      'unit_price':  get(results, 'product.unit_price', 0),
      'rate_of_interest': get(results, 'product.rate_of_interest', 0),
      'interest_type': get(results, 'product.interest_type.name', 0),
      'lot_number': get(results, 'product.lot_number', 0),
      "initial_cost": get(results, 'initial_cost', 0),
      "days_since_purchase": get(results, 'days_since_purchase', 0),
      "created_on": get(results, 'created_on', 0),
      "ordered_on": get(results, 'ordered_on', 0),
      "today": new Date(),
      "interest_accrued": get(results, 'interest_on_compound_period', 0) + get(results, 'interest_for_remaining_days', 0),
      "total_debt": get(results, 'total_debt', 0)
    }
  }
}
