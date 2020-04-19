import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) {

  }

  getProducts() {
    return this.http.get(URL + '/stock');
  }

  postFinanceData(data){
    console.log(data)
    return this.http.post(URL + '/finance',data).subscribe((data) =>{console.log(data)},() =>{})
  }
}
