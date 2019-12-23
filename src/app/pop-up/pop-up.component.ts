import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PopUpService } from './pop-up.service';

@Component({
  selector: 'app-pop-up-component',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {
  body = ''
  data
  show
  sub
  title
  @ViewChild('body1', { static: false }) myChildComponent;
  constructor(private popUpService: PopUpService) {

    this.sub = this.popUpService.component.subscribe(data => {
      if (data) {
        this.title = data.title || 'TITLE';
        this.show = true
        this.body = data.bodyComp
      }
    });
  }

  closePopUp() {
    this.show = false;
    this.popUpService.onApply(false);
  }

  onSubmit() {
    this.popUpService.onApply(true);
  }

  ngOnChanges() {
    console.log('--I am Changed--')
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
