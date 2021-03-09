import {
  Component,
  OnInit,
  Type,
  ViewContainerRef,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { DialogService } from './dialog.service';
import { DialogOutput } from './dialog-output-data';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  closeButtonInnerText: string;
  okButtonInnerText: string;
  childComponent: Type<any>;
  title: string = 'title goes here';

  @ViewChild('vc', { static: true, read: ViewContainerRef }) container: ViewContainerRef;
  constructor(private cd: ChangeDetectorRef, private _cfr: ComponentFactoryResolver, private _do: DialogOutput) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponent);
    this.cd.detectChanges();
  }

  loadChildComponent(childComponentType: any) {
    let factory = this._cfr.resolveComponentFactory(childComponentType);
    this.container.createComponent(factory);
  }

  onClose() { }

  onOk(form, appform) {

  }

  ngOnDestroy() { }
}
