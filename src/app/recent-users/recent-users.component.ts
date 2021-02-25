import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { orderBy } from 'lodash';
import { FinanceService } from 'src/app/user-transactions/finance.service';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-recent-users',
  templateUrl: './recent-users.component.html',
  styleUrls: ['./recent-users.component.scss']
})
export class RecentUsersComponent implements OnInit {
  users: any;
  _selectedUser: any;
  @Output() selectedUser = new EventEmitter()

  constructor(
    private readonly financeService: FinanceService,
    private readonly router: Router,
    private readonly matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.financeService.getAllUsers()
      .subscribe((users) => {
        this.users = orderBy(users, usr => usr.updated_on, 'desc');
        this._selectedUser = this.users[0];
        this.selectedUser.emit(this._selectedUser)
      });
  }

  redirectToUserOrdersPage(userInfo) {
    this._selectedUser = userInfo;
    this.selectedUser.emit(userInfo);
    this.router.navigateByUrl('/users');
  }

  createNewUser() {
    const dialog = this.matDialog.open(AddUserComponent);
    dialog.afterClosed().subscribe((userInfo) => {
      this.users.unshift(userInfo);
      this._selectedUser = userInfo
      this.selectedUser.emit(userInfo);
    })
  }
}
