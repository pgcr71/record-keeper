import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  options = ['fdsg','dfgs'];
  dropdownvalue = 'ganesh'

  constructor() {


  }

  ganesh(value){
    console.log(value)
  }
  onChange(){
    console.log('fasf')
  }
}