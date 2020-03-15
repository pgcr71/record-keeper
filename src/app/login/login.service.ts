import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../environments/environment.prod';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  log: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoggedIn: Observable<boolean> = this.log.asObservable();
  constructor(private http: HttpClient) { }

  login(phonenumber, password) {
    return this.http.post(URL + '/login', { phonenumber, password }).pipe(
      tap((obj) => {
        this.log.next(obj['isAuthorized']);
      }, () => {
        this.log.next(false);
      })
    )
  }
}
