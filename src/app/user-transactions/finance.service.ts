import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  isElectron: boolean;

  constructor(private http: HttpClient, private appService: AppService, private electronService: ElectronService) {
    this.isElectron = this.electronService.isElectronApp;
  }

  getOrders(skip, take) {
    if (this.isElectron) {
      return this.appService.electronEmit('allOrders', { skip, take });
    }
    return this.http.get(`${URL}/orders`, { params: { skip, take } }) as Observable<Array<unknown>>;
  }

  saveOrders(data) {
    if (this.isElectron) {
      return this.appService.electronEmit('saveOrders', data);
    }
    return this.http.post(URL + '/orders', data) as Observable<Array<unknown>>;
  }

  updateOrders(data) {
    if (this.isElectron) {
      return this.appService.electronEmit('updateOrders', data);
    }
    return this.http.post(URL + '/orders/update', data) as Observable<Array<unknown>>;
  }

  getAllUsers() {
    if (this.isElectron) {
      return this.appService.electronEmit('allUsers');
    }
    return this.http.get(URL + '/users') as Observable<Array<unknown>>;
  }

  getUserSavings(id) {
    if (this.isElectron) {
      return this.appService.electronEmit('getUserSavings', { id: id });
    }
    return this.http.get(URL + `/getUserSavingsDetails/${id}`) as Observable<Array<unknown>>;
  }

  delete(data) {
    if (this.isElectron) {
      return this.appService.electronEmit('removeOrders', { id: data.id });
    }
    return this.http.delete(URL + `/orders/${data.id}`) as Observable<Array<unknown>>;
  }

  getAllProducts() {
    if (this.isElectron) {
      return this.appService.electronEmit('allProducts');
    }
    return this.http.get(URL + '/products') as Observable<Array<unknown>>;
  }

  getAllUserOrders(userId: string, start_date: Date, end_date: Date, allOrders?: boolean) {
    if (this.isElectron) {
      return this.appService.electronEmit('getUserOrdersAndRepayments', {
        id: userId,
        start_date: start_date && start_date.toISOString(),
        end_date: end_date && end_date.toISOString(),
        allOrders: allOrders,
      });
    }
    return this.http.get(
      `${URL}/getUserOrdersAndRepayments/${userId}/${start_date}/${end_date}/${allOrders}`
    ) as Observable<Array<unknown>>;
  }

  getUserRepaymentDetails(userId: string, start_date?: Date, end_date?: Date, allOrders?: boolean) {
    if (this.isElectron) {
      return this.appService.electronEmit('getUserRepaymentDetails', { id: userId });
    }
    return this.http.get(`${URL}/getUserRepaymentDetails/${userId}`) as Observable<Array<unknown>>;
  }

  getRemainingStock(productId: string) {
    if (this.isElectron) {
      return this.appService.electronEmit('getRemainingStock', { productId });
    }
    return this.http.get(`${URL}/products/remainingStock/${productId}`) as Observable<Array<unknown>>;
  }
}
