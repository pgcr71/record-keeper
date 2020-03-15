import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class Interceptor implements HttpInterceptor {
    constructor(private router: Router) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = localStorage.getItem('token')
        let headers = req.headers.append('Content-Type', 'application/json');
        headers = headers.append('Authorization', 'bearer ' + token);

        req = req.clone({ headers: headers });
        return next.handle(req).pipe(
            tap((evt) => {
               
            },error=>{
                if (error instanceof HttpErrorResponse) {
                    if ((error as HttpErrorResponse).status == 401) {
                        this.router.navigate(['login']);
                    }
                }
            })
        );
    }

}