import { Injectable, Type, ComponentFactoryResolver, Injector, ApplicationRef, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { DialogOutput } from './dialog-output-data';
import { Subject, Observable } from 'rxjs';
import {DialogInputData} from './dialog-input-data';
import { DialogInjector } from './dialog-injector';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  dialogComponentRef: ComponentRef<DialogComponent>
  domElem: HTMLElement;
  constructor(private _cfr: ComponentFactoryResolver,
    private _injector: Injector,
    private _ar: ApplicationRef) { }

  open(_component: Type<any>, inputData:DialogInputData) {
    this.appendDialogComponentToBody(inputData);
    this.dialogComponentRef.instance.childComponent = _component;
  }

  appendDialogComponentToBody(inputData) {
    if (!this.dialogComponentRef) {
      let dialogOutput:DialogOutput = new DialogOutput();
      let dialoginput:DialogInputData<any>= inputData;
      const map = new WeakMap();
      map.set(DialogOutput,dialogOutput);
      map.set(DialogInputData,dialoginput);
      let factory = this._cfr.resolveComponentFactory(DialogComponent);
      this.dialogComponentRef = factory.create(new DialogInjector(this._injector,map));
      this._ar.attachView(this.dialogComponentRef.hostView);
      this.domElem = (this.dialogComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      document.body.append(this.domElem);
    } 
  }

  removeDialogComponentFromBody() {
    this._ar.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
    document.body.removeChild(this.domElem);
    this.dialogComponentRef = null;
  }

  closeModal() {
    this.removeDialogComponentFromBody();
  }
}
