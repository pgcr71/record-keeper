import { Component, OnInit } from '@angular/core';
import { DialogOutput } from '../dialog-output-data';

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.scss']
})
export class DialogTemplateComponent implements OnInit {


  okButtonInnerText = 'OK'
  closeButtonInnerText = 'CANCEL'

  constructor(private _do:DialogOutput) { }

  ngOnInit() {

  }

  onOk(txt){
    this._do.close(txt.value)
  }

  onClose(){
    this._do.close({});
  }
}
