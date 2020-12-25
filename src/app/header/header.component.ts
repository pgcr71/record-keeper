import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { BreakpointService } from '../shared/breakpoint.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDesktop: boolean;
  @Output() rkIconClick = new EventEmitter();
  constructor(private readonly brs: BreakpointService) { }

  ngOnInit() {
    this.brs.isDesktop$.subscribe((isDesktop: boolean) => {
      this.isDesktop = isDesktop;
    })
  }

  onIconClick() {
    this.rkIconClick.emit();
  }
}
