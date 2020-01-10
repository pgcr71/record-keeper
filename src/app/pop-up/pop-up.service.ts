import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PopUpService {
  x: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public component = this.x.asObservable();
  constructor() {

  }

  open(data: { title: string, bodyComp: any }) {
    this.x.next(data);
  }

}
