import { Component, OnInit, Type, ViewContainerRef, ViewChild } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  closeButtonInnerText: string;
  okButtonInnerText: string;
  childComponent: Type<any>;
  title: string = 'title goes here';

  @ViewChild('vc', { static: true, read: ViewContainerRef }) container;
  constructor(private _ds: DialogService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  onClose() {
    this._ds.close.next();
  }

  onOk() {

  }

  ngOnDestroy() {

  }
}
