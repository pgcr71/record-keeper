import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { AppService } from 'src/app/app.service';
import { URL } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isElectron: boolean;
  constructor(
    private readonly http: HttpClient,
    private appService: AppService,
    private electronService: ElectronService
  ) {
    this.isElectron = this.electronService.isElectronApp;
  }

  addUser(data) {
    if (this.isElectron) {
      return this.appService.electronEmit('saveUsers', data);
    }
    return this.http.post(`${URL}/users`, data);
  }
}
