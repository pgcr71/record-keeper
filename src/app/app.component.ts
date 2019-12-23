import { Component, Inject } from '@angular/core';
import { PopUpComponent } from './pop-up/pop-up.component';
import { PopUpService } from './pop-up/pop-up.service';
import { TestComponent } from './test/test.component';
import { InjectionToken } from '@angular/core';
import { inject } from '@angular/core/testing';
import { config } from 'rxjs';
import { Test2Component } from './test2/test2.component';


export interface AppConfig {
  test:string
}

const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: APP_CONFIG, useValue: 'ganesh' }]
})


export class AppComponent {
  popUp = PopUpComponent;
  
  constructor(@Inject(APP_CONFIG) private config, private popUpService:PopUpService) {
    console.log(this.config)
  }

  openPopUp(){
    this.popUpService.open({title:'test',bodyComp:TestComponent})
  }

  openPopUp2(){
    this.popUpService.open({title:'test2',bodyComp:Test2Component})
  }
}