import { Component, OnInit } from '@angular/core';
import { PopUpService } from '../pop-up/pop-up.service';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component implements OnInit {
  sub
  constructor(private popUpService: PopUpService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.sub = this.popUpService.submit.subscribe(isSubmitted => {
      if (isSubmitted) {
        console.log('from test2', isSubmitted)
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
