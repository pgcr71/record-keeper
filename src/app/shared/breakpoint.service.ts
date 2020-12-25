import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  isDesktop = new BehaviorSubject<boolean>(false);
  isDesktop$ = this.isDesktop.asObservable();
  isMobile = new BehaviorSubject<boolean>(true);
  isMobile$ = this.isMobile.asObservable();

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.observeBreakPoints();
  }

  observeBreakPoints() {
    this.breakpointObserver.observe([Breakpoints.TabletLandscape, Breakpoints.Web, Breakpoints.HandsetLandscape])
      .pipe(tap(result => this.isDesktop.next(result.matches))).subscribe();
    this.breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
      .pipe(tap(result => this.isMobile.next(result.matches))).subscribe();
  }
}
