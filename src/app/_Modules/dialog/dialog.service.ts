import { Injectable, Type, ComponentFactoryResolver, Injector, ApplicationRef, ComponentRef, EmbeddedViewRef } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { dialogOutput } from './dialog-output-data';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  close: Subject<any> = new Subject();
  _onClose: Observable<any> = this.close.asObservable();

  dialogComponentRef: ComponentRef<DialogComponent>
  domElem: HTMLElement;
  constructor(private _cfr: ComponentFactoryResolver,
    private _injector: Injector,
    private _ar: ApplicationRef) { }

  open(_component: Type<any>) {
    this.appendDialogComponentToBody();
  }

  appendDialogComponentToBody() {

    let sub = this._onClose.subscribe(() => {
      setTimeout(() => {
        this.closeModal();
        sub.unsubscribe();
      }, 0)
    })

    if (!this.dialogComponentRef) {
      let factory = this._cfr.resolveComponentFactory(DialogComponent);
      this.dialogComponentRef = factory.create(this._injector);
      this._ar.attachView(this.dialogComponentRef.hostView);
      this.domElem = (this.dialogComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      document.body.append(this.domElem);
    }
    //componentRef.instance.childComponent = _component;
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
