import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class AppService {

    DIR = 'http://localhost:4300'
    constructor(private http:HttpClient){

    }
    getData(){
        return this.http.get(this.DIR + '/')
    }
}