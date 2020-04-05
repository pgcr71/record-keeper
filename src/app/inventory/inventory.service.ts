import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URL} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {


  constructor(private http:HttpClient) { }

  add(data) {
    return this.http.post(URL + '/stock',data);
  }

  get(){
    return this.http.get(URL + '/stock');
  }
}
