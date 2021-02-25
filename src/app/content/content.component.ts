import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { BreakpointService } from '../shared/breakpoint.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  constructor(
    public readonly bps: BreakpointService,
    public readonly appService: AppService
  ) { }
}
