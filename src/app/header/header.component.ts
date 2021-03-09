import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { BreakpointService } from '../shared/breakpoint.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDesktop: boolean;
  @Output() rkIconClick = new EventEmitter();
  constructor(private readonly brs: BreakpointService, private readonly electronService: ElectronService) { }

  ngOnInit() {
    this.brs.isDesktop$.subscribe((isDesktop: boolean) => {
      this.isDesktop = isDesktop;
    });
  }

  onIconClick() {
    this.rkIconClick.emit();
  }

  closeApp() {
    let window = this.electronService && this.electronService.remote && this.electronService.remote.getCurrentWindow();
    window && window.close();
  }
}
