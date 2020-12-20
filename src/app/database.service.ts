import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private readonly _electronService: ElectronService) { }

  creatItems(): Observable<any[]> {
    return of(this._electronService.ipcRenderer.sendSync('get-items')).pipe(
      catchError((error: any) => throwError(error.json))
    );
  }

  getItems(): Observable<any[]> {
    return of(this._electronService.ipcRenderer.sendSync('getAll')).pipe(
      catchError((error: any) => throwError(error.json))
    );
  }
  addItem(item: any): Observable<any[]> {
    return of(
      this._electronService.ipcRenderer.sendSync('addOne', item)
    ).pipe(catchError((error: any) => throwError(error.json)));
  }

  deleteItem(item: any): Observable<any[]> {
    return of(
      this._electronService.ipcRenderer.sendSync('delete-item', item)
    ).pipe(catchError((error: any) =>throwError(error.json)));
  }
}
