import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  isElectron: boolean;

  constructor(
    private http: HttpClient,
    private readonly appService: AppService,
    private readonly electronService: ElectronService
  ) {
    this.isElectron = this.electronService.isElectronApp;
  }

  add(data) {
    if (this.isElectron) {
      return this.appService.electronEmit('saveProducts', data);
    }

    return this.http.post(URL + '/products', data);
  }

  get(): Observable<Array<object>> {
    if (this.isElectron) {
      return this.appService.electronEmit('allProducts');
    }
    return this.http.get(URL + '/products') as Observable<Array<object>>;
  }

  delete(data) {
    if (this.isElectron) {
      return this.appService.electronEmit('removeProducts', data);
    }
    return this.http.delete(`${URL}/products/${data.id}`);
  }

  update(data) {
    if (this.isElectron) {
      return this.appService.electronEmit('saveProducts', data);
    }
    return this.http.put(URL + '/products', data);
  }

  getInterestTypes(): Observable<Array<object>> {
    if (this.isElectron) {
      return this.appService.electronEmit('allInterestTypes');
    }
    return this.http.get(URL + '/interestTypes') as Observable<Array<object>>;
  }
}
