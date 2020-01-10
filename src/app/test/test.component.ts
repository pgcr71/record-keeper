import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { PopUpService } from '../pop-up/pop-up.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, AfterViewInit, OnDestroy {

  sub
  constructor(private popUpService: PopUpService) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
