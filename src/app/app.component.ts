import { Component, ViewChild } from '@angular/core';
import { PopUpService } from './pop-up/pop-up.service';
import { PopUpComponent } from './pop-up/pop-up.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'record-keeper';
  popUp = PopUpComponent;
  constructor() {

  }
}
