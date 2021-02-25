import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AppService } from './app.service';
import { tap } from 'rxjs/operators';
import { BreakpointService } from './shared/breakpoint.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  row: any;
  showFiller = 'false';
  isDesktop: boolean;
  displaySideNav: boolean;
  links: Array<{ name: string; link: string }> = [
    {
      name: 'Inventory',
      link: 'products',
    },
    {
      name: 'Orders',
      link: 'orders',
    },
    {
      name: 'Repayment',
      link: 'billing',
    },
    {
      name: 'Summary',
      link: 'repayment',
    },
  ];
  activeUserSubscription: Subscription;
  activeUser: any;
  constructor(
    private readonly bps: BreakpointService,
    private readonly as: AppService
  ) { }

  ngOnInit() {
    this.bps.isDesktop$.subscribe((bool) => (this.isDesktop = bool));
  }

  onUserSelection(user) {
    this.activeUser = user;
    this.as.activeUser.next(user);
  }

  ngOnDestroy(): void {
    // this.activeUserSubscription.unsubscribe();
  }
}
