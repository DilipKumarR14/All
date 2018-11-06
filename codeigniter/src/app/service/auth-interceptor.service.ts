import { HttpInterceptor,HttpRequest,HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    let currentUser = localStorage.getItem('token');
    if (currentUser) {
        request = request.clone({
            setHeaders: { 
                Authorization: `Bearer ${currentUser}`
            }
        });
    }

    return next.handle(request);
}
}
