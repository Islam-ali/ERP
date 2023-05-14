import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private authfackservice: AuthfakeauthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (currentUser && currentUser.token) {
        // if (environment.defaultauth === 'firebase') {
        //     const currentUser = this.authenticationService.currentUser();
        //     if (currentUser && currentUser.token) {
        //         request = request.clone({
        //             setHeaders: {
        //                 Authorization: `Bearer ${currentUser.token}`
        //             }
        //         });
        //     }
        // } else {
        //     // add authorization header with jwt token if available
        //     const currentUser = this.authfackservice.currentUserValue;
        //     if (currentUser && currentUser.token) {
        //         request = request.clone({
        //             setHeaders: {
        //                 Authorization: `Bearer ${currentUser.token}`
        //             }
        //         });
        //     }
        // }
        
        const lang = JSON.parse(localStorage.getItem('lang_ERP'))?.lang || 'ar'
        const currentUser: any = this.authenticationService.getUser()
        if (currentUser) {
            request = request.clone({
                setHeaders: {
                    'Accept-Language': lang,
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}
