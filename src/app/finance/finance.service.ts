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
    return this.http.get(URL + '/products/all');
  }

  postFinanceData(data){
    console.log(data)
    return this.http.post(URL + '/orders/create',data).subscribe((data) =>{console.log(data)},() =>{})
  }

  getUserDataByPhoneNumberorFirstName(searchTerm){
    return this.http.post(URL + '/search', {searchTerm});
  }

  getAllOders(){
    return this.http.get(URL + '/orders/all');
  }
}
