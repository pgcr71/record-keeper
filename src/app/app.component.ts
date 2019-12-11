import { Component, ViewChild } from '@angular/core';
import { PopUpService } from './pop-up/pop-up.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'record-keeper';
  popUpComponent:any = null;
  constructor(private service:PopUpService){
    this.service.y.subscribe(com => this.popUpComponent = com);
  }
}
