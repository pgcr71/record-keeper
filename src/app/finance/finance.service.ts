import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../environments/environment'
import { Observable } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  isElectron: boolean;

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private electronService: ElectronService
    ) {
      this.isElectron = this.electronService.isElectronApp;
  }

  getOrders() {
    if (this.isElectron) {
      return this.appService.electronEmit('allOrders');
    }
    return this.http.get(URL + '/orders') as Observable<Array<object>>;
  }

  saveOrders(data){
    if (this.isElectron) {
      return this.appService.electronEmit('saveOrders', data);
    }
    return this.http.post(URL + '/orders', data) as Observable<Array<object>>;
  }

  getAllUsers() {
    if (this.isElectron) {
      return this.appService.electronEmit('allUsers');
    }
    return this.http.get(URL + '/users') as Observable<Array<object>>
  }

  getAllProducts() {
    if (this.isElectron) {
      return this.appService.electronEmit('allProducts');
    }
    return this.http.get(URL + '/products')  as Observable<Array<object>>;
  }

  getAllUserOrders(userId: string) {
    if (this.isElectron) {
      return this.appService.electronEmit('userAllOrders', userId);
    }
    return this.http.get(`${URL}/orders/user/${userId}`)  as Observable<Array<object>>;
  }

  getRemainingStock(productId: string) {
    if (this.isElectron) {
      return this.appService.electronEmit('getRemainingStock');
    }
    return this.http.get(`${URL}/products/remainingStock/${productId}`)  as Observable<Array<object>>;
  }

}
