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
    this.sub = this.popUpService.submit.subscribe(isSubmitted => {
      if (isSubmitted) {
        console.log('from test1', isSubmitted)
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
