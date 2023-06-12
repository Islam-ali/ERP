import { Injectable } from '@angular/core';

import { getFirebaseBackend } from '../../authUtils';
import { User } from '../models/auth.models';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { DataLoginRes } from 'app/account/auth/login2/login';
import jwt_decode from 'jwt-decode';
@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    user: User;
    isAuth: BehaviorSubject<boolean> = new BehaviorSubject(localStorage.getItem('user_ERP') ? true : false);
    Auth$ = this.isAuth.asObservable();
    DecodedToken: any;
    constructor() {
    }
    getDecodedAccessToken(): any {
        try {
            return this.DecodedToken = jwt_decode(this.getUser().token);
        } catch (Error) {
            return null;
        }
    }
    checkPermission(value: string) {
        return this.DecodedToken.Permission.includes(value)
    }
    /**
     * Returns the current user
     */
    public currentUser(): User {
        return getFirebaseBackend().getAuthenticatedUser();
    }

    public getUser(): DataLoginRes {
        return JSON.parse(localStorage.getItem('user_ERP')) || null
    }
    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        return getFirebaseBackend().loginUser(email, password).then((response: any) => {
            const user = response;
            return user;
        });
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(email: string, password: string) {
        return getFirebaseBackend().registerUser(email, password).then((response: any) => {
            const user = response;
            return user;
        });
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend().forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    /**
     * Logout the user
     */
    logout() {
        // logout the user
        getFirebaseBackend().logout();
    }
}

