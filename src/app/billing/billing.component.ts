import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { FinanceService } from '../finance/finance.service';
import { get } from 'lodash'
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RepaymentService } from '../repayments/repayment.service';

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
    remaining_amount: number;
    paid_amount: number;
    total_debt
   }> = [];
  displayedColumns = ['select', 'period', 'productInfo',  'interestDetails',  'totalDebt', 'remainingAmount']
  totalPrincipal: number;
  totalInterest: number;
  totalDebt: number;
  dataSource = new MatTableDataSource<any>(this.billingDetails);
  selection = new SelectionModel<any>(true, []);
  maxDate = new Date();
  userInfo: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly is: FinanceService,
    private readonly snackBar: MatSnackBar,
    private readonly rs: RepaymentService
  ) { }

  ngOnInit(): void {
    this.billingCreateForm = this.fb.group({
      user: ['', Validators.required],
      price: [null, Validators.required],
      paid_on: [new Date(), Validators.required],
      comments: ['']
    });

    this.is.getAllUsers().subscribe((users) => {
      this.users = users;
      this.billingCreateForm.get('user').setValue('')
    });

    this.billingCreateForm.get('paid_on')
    .valueChanges.subscribe((value) => {
      this.getUserOrders(this.userInfo, value);
    })

    this.billingCreateForm.get('price')
    .valueChanges
    .pipe(
      debounceTime(500),
    ).subscribe((value) => this.calculateRemaining(value))

    this.userSearch = this.billingCreateForm.get('user').valueChanges
    .pipe(
      startWith(''),
      map(value => value && (typeof value === 'string' ? value : value['first_name'] + " " + value['last_name'])),
      map(name => name ? this._userFilter(name) : this.users.slice())
    );

  }

    calculateRemaining(amount) {
      this.selection.clear();
        const user = this.billingCreateForm.get('user').value;
        if(!user || !this.billingDetails.length) {
          return;
        }
        let sum = 0;
        let sumOfFiltered = 0;
        let filteredResults = this.billingDetails.filter((row) => {
          let include = false;
          row.remaining_amount = row.total_debt;
          if(sum < Number(amount)) {
            include =  true;
            row.remaining_amount = 0;
            row.paid_amount = row.total_debt;
            sumOfFiltered = sumOfFiltered + Number(row.total_debt)
          }

          sum = row.total_debt + sum;
          return include;
        })

        const last = filteredResults.length - 1;
      if (last > -1) {
        filteredResults[last].remaining_amount = sumOfFiltered - amount;
        filteredResults[last].paid_amount = filteredResults[last].total_debt - filteredResults[last].remaining_amount ;
      };
        this.selection.deselect(...this.billingDetails)
        this.selection.select(...filteredResults);
    }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
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
    this.userInfo = userInfo;
    this.getUserOrders(userInfo, new Date());
  }

  getUserOrders(userInfo, date: Date) {
    this.is.getAllUserOrders(userInfo.id, date).subscribe((data: Array<object>) => {
     this.billingDetails = get(data, 'orders', []).map(result => this.formatData(result));
     this.dataSource =  new MatTableDataSource<any>(this.billingDetails);
      this.totalPrincipal = this.billingDetails.reduce((acc, next) => acc + next.initial_cost, 0);
      this.totalInterest = this.billingDetails.reduce((acc, next) => acc + next.interest_accrued, 0);
      this.totalDebt = this.billingDetails.reduce((acc, next) => acc + next.total_debt, 0);
      this.calculateRemaining(this.billingCreateForm.get('price').value);
    })
  }

  formatData(results) {
    return {
      'id': get(results, 'id', ''),
      'quantity': get(results, 'quantity', 0),
      "product_name": get(results, 'product.name', 0),
      'unit_price':  Number(get(results, 'product.unit_price', 0)),
      'rate_of_interest': Number(get(results, 'product.rate_of_interest', 0)),
      'interest_type': Number(get(results, 'product.interest_type.name', 0)),
      'lot_number': get(results, 'product.lot_number', 0),
      "initial_cost": Number(get(results, 'initial_cost', 0)),
      "days_since_purchase": Number(get(results, 'days_since_purchase', 0)),
      "created_on": get(results, 'created_on', 0),
      "ordered_on": get(results, 'ordered_on', 0),
      "today": new Date(),
      "remaining_amount":  Number(get(results, 'remaining_amount_tobe_paid', 0) || get(results, 'total_debt', 0)),
      "paid_amount" : 0,
      "payment_status": get(results, 'payment_status', {}),
      "interest_accrued": Number(get(results, 'interest_on_compound_period', 0) + get(results, 'interest_for_remaining_days', 0)),
      "total_debt": Number(get(results, 'remaining_amount_tobe_paid', 0) || get(results, 'total_debt', 0))
    }
  }

  onSubmit() {

    if (this.billingCreateForm.valid) {
      this.rs.add(this.billingCreateForm.value, this.selection.selected).subscribe((res) => {
          this.billingCreateForm.reset();
          this.snackBar.open('Data Saved Succesfully', "Close", {
            duration: 2000
          } )
      }, error => {
        console.log(error)
        this.snackBar.open(error.error.sqlMessage, "Close", {
          duration: 2000,
          panelClass: ['waring-snackbar']
        } )
      })
    }
  }
}
