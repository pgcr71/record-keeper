import { Component, OnInit } from '@angular/core';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';
import { DialogService } from '../_Modules/dialog/dialog.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private _ds: DialogService, private _as: AppService) { }

  ngOnInit() {
  }

  openDialog() {
    this._ds.open(DialogTemplateComponent).subscribe((data) => {
      console.log(data)
    })
  }

  getData() {
    this._as.getData().subscribe(data => { console.log(data) });
  }
}
