import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InterceptorModule } from './interceptor.module';



@Injectable({providedIn :'root'})
export class Interceptor implements HttpInterceptor   {
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{

       let  headers = req.headers.append('Content-Type', 'application/json');
        req = req.clone({headers:headers})
        return next.handle(req).pipe(
            tap((evt) => {
                console.log('req',req)
                console.log(evt);
            })
        );
    }

}