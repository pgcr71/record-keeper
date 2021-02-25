import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  isElectron: boolean;

  constructor(
    private http: HttpClient,
    private readonly appService: AppService,
    private readonly electronService: ElectronService
  ) {
    this.isElectron = this.electronService.isElectronApp;
  }

  add(totalPayments, orderRepayments, excessAmount) {
    if (this.isElectron) {
      return this.appService.electronEmit('saveRepayments', {
        totalAmount: totalPayments,
        orderPaidFor: orderRepayments,
        savings: excessAmount,
      });
    }

    return this.http.post(URL + '/repayments', { totalAmount: totalPayments, orderPaidFor: orderRepayments, savings: excessAmount });
  }

  get(): Observable<Array<any>> {
    if (this.isElectron) {
      return this.appService.electronEmit('allProducts');
    }
    return this.http.get(URL + '/products') as Observable<Array<any>>;
  }

  delete() {
    if (this.isElectron) {
      return this.appService.electronEmit('removeProducts');
    }
    return this.http.delete(URL + '/products');
  }

  update(data) {
    if (this.isElectron) {
      return this.appService.electronEmit('saveProducts', data);
    }
    return this.http.put(URL + '/products', data);
  }

  getInterestTypes(): Observable<Array<any>> {
    if (this.isElectron) {
      return this.appService.electronEmit('allInterestTypes');
    }
    return this.http.get(URL + '/interestTypes') as Observable<Array<any>>;
  }
}
