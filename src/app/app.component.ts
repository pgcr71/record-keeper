import { Component, OnInit } from '@angular/core';
import { BreakpointService } from './shared/breakpoint.service';
import { LoaderService } from './shared/loader/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  row: any;
  showFiller = 'false';
  isDesktop: boolean;
  constructor(
    private readonly bps: BreakpointService,
    public readonly loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.bps.isDesktop$.subscribe((bool) => (this.isDesktop = bool));
  }
}
