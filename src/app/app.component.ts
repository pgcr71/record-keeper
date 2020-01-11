import { Component } from '@angular/core';
import { DialogService } from './_Modules/dialog/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
 
  constructor(private _ds: DialogService) {

  }

  openPopUp() {
    // this._ds.open(TestComponent)
  }

  // closeDialog() {
  //   this._ds.close();
  // }

  openPopUp2() {

  }
}