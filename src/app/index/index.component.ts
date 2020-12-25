import { Component, OnInit } from '@angular/core';
import { DialogTemplateComponent } from '../shared/dialog/dialog-template/dialog-template.component';
import { DialogService } from '../shared/dialog/dialog.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private _ds: DialogService, private _as: AppService) { }
  showFiller: true;
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
