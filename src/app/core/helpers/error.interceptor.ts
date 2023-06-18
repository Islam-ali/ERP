import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            let error = '';
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                // this.authenticationService.logout();
                // location.reload();
                this.router.navigate(['/account/login']);
            }else if(err.status === 403){
                 error = 'Not Exist Permmision'
            }
             error = err.error || err.statusText;
            return throwError(error);
        }));
    }
}
