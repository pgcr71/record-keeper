import { Injectable, ApplicationRef, ComponentFactoryResolver, Injector, EmbeddedViewRef } from '@angular/core';
import { ToasterComponent } from './toaster.component';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  componentRef: any;
  domElem: HTMLElement;

  constructor(private injector: Injector, private app: ApplicationRef, private cfr: ComponentFactoryResolver) {}

  success(message, options?) {
    this.appendToasterComponentToBody(message, options ? options : { color: 'green' });
  }

  danger(message, options?) {
    this.appendToasterComponentToBody(message, options ? options : { color: 'red' });
  }

  warning(message, options?) {
    this.appendToasterComponentToBody(message, options ? options : { color: 'yellow' });
  }

  appendToasterComponentToBody(message, options) {
    var taosterComponent = this.cfr.resolveComponentFactory(ToasterComponent);
    this.componentRef = taosterComponent.create(this.injector);
    this.componentRef.instance.message = message;
    this.componentRef.instance.options = options;
    this.app.attachView(this.componentRef.hostView);
    this.domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.append(this.domElem);
    this.removeAfterTimeout(options);
  }

  removeAfterTimeout(options) {
    setTimeout(
      () => {
        this.app.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
        document.body.removeChild(this.domElem);
        this.componentRef = null;
      },
      options.time ? options.time : 10000
    );
  }
}
