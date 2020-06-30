import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URL} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {


  constructor(private http:HttpClient) { }

  add(data) {
    return this.http.post(URL + '/products/add',data);
  }

  get(){
    return this.http.get(URL + '/products/all');
  }

  delete(){
    return this.http.delete(URL + '/products')
  }

  update(data){
    return this.http.put(URL  + '/products',data)
  }
}
