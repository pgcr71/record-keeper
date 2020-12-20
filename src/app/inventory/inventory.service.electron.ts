import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URL} from '../../environments/environment.prod';
import { ElectronModule } from '../electron.module';
import { ElectronService } from 'ngx-electron';
import { DatabaseService } from '../database.service';

@Injectable()
export class InventoryServiceElectron {
row

  constructor(private dbService: DatabaseService) { }

  add(data) {
    return this.dbService.addItem(data)
  }
  get(){
    return this.dbService.getItems();
  }
}
