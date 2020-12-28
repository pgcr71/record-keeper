import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL} from '../../../../environments/environment'

@Injectable({
    providedIn: 'root'
  }
)

export class UserService {
  constructor(
    private readonly http: HttpClient
  ) {

  }

  addUser(data) {
    return this.http.post(`${URL}/users`, data);
  }
}
