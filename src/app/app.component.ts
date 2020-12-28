import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AppService } from './app.service';
import { tap } from 'rxjs/operators';
import { BreakpointService } from './shared/breakpoint.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
  row: any;
  showFiller = 'false';
  isDesktop: boolean;
  displaySideNav: boolean;
  links: Array<{name: string, link: string}> = [{
    name: 'Inventory',
    link: 'products'
  }]
  constructor(
    private readonly bps: BreakpointService
    ) {
  }

  ngOnInit() {
    this.bps.isDesktop$.subscribe(bool => this.isDesktop = bool);
  }

  // redirectToOrders() {
  //   this.route
  // }
}
