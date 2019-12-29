import { Component, Inject } from '@angular/core';
import { PopUpComponent } from './pop-up/pop-up.component';
import { PopUpService } from './pop-up/pop-up.service';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  popUp = PopUpComponent;

  constructor(private popUpService: PopUpService) {


  }

  openPopUp() {
    this.popUpService.open({ title: 'test', bodyComp: TestComponent })
  }

  openPopUp2() {
    this.popUpService.open({ title: 'test2', bodyComp: Test2Component })
  }
}