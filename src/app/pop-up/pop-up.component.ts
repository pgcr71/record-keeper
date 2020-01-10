import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef, AfterViewInit } from '@angular/core';
import { PopUpService } from './pop-up.service';

@Component({
  selector: 'app-pop-up-component',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements AfterViewInit {
  body: ComponentRef<any>;
  data
  isHidden = true;
  sub
  title
  @ViewChild('vc', { static: true, read: ViewContainerRef }) container;
  isSubmitted: boolean;
  isCancelled: boolean;
  constructor(private popUpService: PopUpService, private cfr: ComponentFactoryResolver) {
  }

  ngAfterViewInit() {
    let _this = this;
    this.sub = this.popUpService.component.subscribe(data => {
      if (data) {
        this.isHidden = !this.isHidden;
        _this.title = data.title || 'TITLE';
        if (this.container) {
          this.container.clear();
          let factory = this.cfr.resolveComponentFactory(data.bodyComp);
          this.body = this.container.createComponent(factory);
        }
      }
    });
  }

  closePopUp() {
    this.isCancelled = true;
    this.isHidden = !this.isHidden;
    this.body.instance.isCancelled = true;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isHidden = !this.isHidden;
    this.body.instance.isSubmitted = true;
  }

  ngOnChanges() {
    console.log('--I Changed--')
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
