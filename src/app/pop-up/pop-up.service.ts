import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PopUpService {
  x: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public component = this.x.asObservable();
  t: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  public submit = this.t.asObservable();
  constructor() {

  }

  open(data: { title: string, bodyComp: any }) {
    this.x.next(data);
    return {
        onApply:this.submit,
        onClose:this.submit
    }
  }


  onApply(bool) {
    this.t.next(bool)
  }

}
