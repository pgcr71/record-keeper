import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URL} from '../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  validatePhoneNumber(phonenumber){
    return this.http.post(URL + '/validatePhoneNumber',{phonenumber})
  }

  validateUsername(username){
    return this.http.post(URL + '/validateUsername',{username})
  }

  signup(data){
    console.log(data)
    return this.http.post(URL + '/signup',data)
  }
}
