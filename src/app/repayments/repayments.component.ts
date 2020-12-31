import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FinanceService } from '../finance/finance.service';
import { RepaymentService } from './repayment.service';

@Component({
  selector: 'app-repayments',
  templateUrl: './repayments.component.html',
  styleUrls: ['./repayments.component.scss']
})
export class RepaymentsComponent implements OnInit {

  repaymentForm: FormGroup;
  userSearch: Observable<any>;
  maxDate: Date = new Date();
  users = [];
  repayments: any;
  constructor(
    private readonly fb: FormBuilder,
    private readonly fs: FinanceService,
    private readonly snackBar: MatSnackBar,
    private readonly rs: RepaymentService
    ) { }

  ngOnInit(): void {
    this.repaymentForm = this.fb.group({
        user: [null, [Validators.required]],
        price: [null, [Validators.required]],
        paid_on: [new Date(), Validators.required],
        comments: ['']
    });

    this.fs.getAllUsers().subscribe((users) => {
      this.users = users;
      this.repaymentForm.get('user').setValue('');
    });

    this.userSearch = this.repaymentForm.get('user').valueChanges
    .pipe(
      startWith(''),
      map(value => value && (typeof value === 'string' ? value : value['first_name'] + " " + value['last_name'])),
      map(name => name ? this._userFilter(name) : this.users.slice())
    );

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

  userDisplayFn(user): string {
    return (user && (user['first_name'] + user['last_name'])) ? user['first_name'] + " " + user['last_name'] : '';
  }


  onSubmit() {
    console.log(this.repaymentForm.value)
    if (this.repaymentForm.valid) {
      this.rs.add(this.repaymentForm.value, {}).subscribe((res) => {
          this.repayments = [...this.repayments, this.repaymentForm.value];
          this.repaymentForm.reset();
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
