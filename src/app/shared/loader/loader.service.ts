import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  showLoader = new BehaviorSubject(null);
  showLoader$ = this.showLoader.asObservable();

  show() {
    this.showLoader.next(true);
  }

  hide() {
    this.showLoader.next(false);
  }
}
