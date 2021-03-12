import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddUserComponent } from '../shared/customers/add-user/add-user.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(
    private readonly matDialog: MatDialog,
    private readonly router: Router,
    private readonly appService: AppService
  ) { }

  createNewUser() {
    const dialog = this.matDialog.open(AddUserComponent);
    dialog.afterClosed().subscribe((userInfo) => {
      if (userInfo) {
        this.appService.activeUser.next(userInfo);
      }
    })
  }

  redirectToOrdersPage() {
    this.appService.activeTransaction.next(null);
    this.router.navigateByUrl('/orders');
  }


  redirectToRepaymentsPage() {
    this.appService.activeTransaction.next(null);
    this.router.navigateByUrl('/repayment')
  }
}
