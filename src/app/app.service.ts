import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { URL } from '../environments/environment.prod';
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class AppService {
  constructor(private http: HttpClient) {

  }

  getData() {
    return this.http.get(URL + '/')
  }
}
