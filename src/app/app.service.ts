import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../environments/environment.prod';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { catchError, map } from 'rxjs/operators';
import { cloneDeep } from 'lodash';

@Injectable({ providedIn: 'root' })
export class AppService {
  isElectron: boolean;
  activeUser = new BehaviorSubject(null);
  activeUser$ = this.activeUser.asObservable().pipe(map((value) => cloneDeep(value)));
  allUsers = new BehaviorSubject([]);
  allUsers$ = this.allUsers.asObservable().pipe(map((value) => cloneDeep(value)));
  activeTransaction = new BehaviorSubject(null);
  activeTransaction$ = this.activeTransaction.asObservable().pipe(map((value) => cloneDeep(value)));
  constructor(private http: HttpClient, private readonly _electronService: ElectronService) {
    this.isElectron = this._electronService.isElectronApp;
  }

  get(endPoint: string) {
    if (this.isElectron) {
      return this.electronEmit('all');
    }
    return this.http.get(endPoint);
  }

  post(endPoint: string, body?: any, options?) {
    if (this.isElectron) {
      return this.electronEmit('save', body, options);
    }
    return this.http.post(endPoint, body, options);
  }

  delete(endpoint: string, options?): any {
    if (this.isElectron) {
      return this.electronEmit('remove', options);
    }

    return this.http.delete(endpoint, options);
  }

  put(endpoint: string, body?, options?): any {
    if (this.isElectron) {
      return this.electronEmit(endpoint, body, options);
    }

    return this.http.put(endpoint, body, options);
  }

  electronEmit(endPoint: string, data?: any, options?: any) {
    return of(this._electronService.ipcRenderer.sendSync(endPoint, data, options)).pipe(
      catchError((error: any) => throwError(error.json))
    );
  }
}
