import { Component, OnInit } from '@angular/core';
import { PopUpService } from './pop-up.service';

@Component({
  selector: 'app-pop-up-component',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {
  tl:string = 'dfsaf';
  popUp
  constructor(private service:PopUpService) {
    this.service.y.subscribe(com => this.popUp = com);
   }

  ngOnInit() {

  }

}
