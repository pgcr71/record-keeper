import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(
    private http: HttpClient
    ) {

  }

  getOrders() {
    return this.http.get(URL + '/orders') as Observable<Array<object>>;
  }

  saveOrders(data){
    return this.http.post(URL + '/orders', data)
      .subscribe((data) => { console.log(data); }, () => { }) as unknown as Observable<Array<object>>;
  }

  getAllUsers() {
    return this.http.get(URL + '/users') as Observable<Array<object>>
  }

  getAllProducts() {
    return this.http.get(URL + '/products')  as Observable<Array<object>>;
  }

}
