import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

@Injectable({ providedIn: 'root' })
export class Interceptor implements HttpInterceptor {
  constructor(private router: Router, private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token ? token : ''}`,
    };
    const params = {
      userId: undefined,
      userRoleId: undefined,
    };
    params.userId = localStorage.getItem('userId');
    params.userRoleId = localStorage.getItem('rolesId');

    console.log(params.userId);
    req = req.clone({ setHeaders: headers, body: { ...req.body, ...params } });

    return next.handle(req).pipe(
      tap(
        (evt) => evt,
        (error) => {
          if (error instanceof HttpErrorResponse) {
            if ((error as HttpErrorResponse).status == 401) {
              this.router.navigate(['login']);
            }
          }
        }
      )
    );
  }
}
