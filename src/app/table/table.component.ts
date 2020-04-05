import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() headers = [];
  @Input() rows = [];
  @Input() customCss = {};
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){

  }

}
