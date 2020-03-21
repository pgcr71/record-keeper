import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  validatePhoneNumber(phonenumber){
    return this.http.post(URL + '/validatePhoneNumber',{phonenumber})
  }
}
