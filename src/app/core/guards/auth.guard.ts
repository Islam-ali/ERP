import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { Role } from '../modal/role';
import { log } from 'console';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if (environment.defaultauth === 'firebase') {
        //     const currentUser = this.authenticationService.currentUser();
        //     if (currentUser) {
        //         // logged in so return true
        //         return true;
        //     }
        // } else {
        //     const currentUser = this.authFackservice.currentUserValue;
        //     if (currentUser) {
        //         // logged in so return true
        //         return true;
        //     }
        // }
        const currentUser = this.authenticationService.getUser();
        if (currentUser) {
            const { roles } = route.data;
            let z = [];
            
            if(roles){
                for (let i = 0; i < currentUser.roleNames.length; i++) {
                    for (let j = 0; j < roles.length; j++) {
                        if(currentUser.roleNames[i] == roles[j]){
                            z.push( roles[j])
                        }
                    }
                }
                if (z.length == 0) {
                    this.router.navigate(['/account/login']);
                    return false;
                }
            }
            return true
        }
        this.router.navigate(['/account/login']);
        return false;
        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/account/login']);
        // return false;
    }
}
