import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoginServiceElectron {

  log: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoggedIn: Observable<boolean> = this.log.asObservable();
  userInfo: BehaviorSubject<any> = new BehaviorSubject({});
  userInfo$: Observable<any> = this.userInfo.asObservable();
  userInfoData:any = {};

  constructor(private http: HttpClient) { }

  // login(phonenumber, password) {
  //   return this.http.post(URL + '/login', { phonenumber, password }).pipe(
  //     tap((obj) => {
  //       this.log.next(obj['isAuthorized']);
  //       this.userInfo.next(obj['data']);
  //       this.userInfoData = obj['data'];
  //     }, () => {
  //       this.log.next(false);
  //     })
  //   )
  // }
}
