import { Injectable, ViewRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PopUpService {

  x:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public y = this.x.asObservable();
  constructor() { }

  open(com: any,data) {
    this.x.next(com);
  }

  close() {
    this.x.next(null);
  }

}
