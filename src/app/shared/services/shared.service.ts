import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isAddCompany:BehaviorSubject<boolean> = new BehaviorSubject(false);
  isRouteNotification$:BehaviorSubject<boolean> = new BehaviorSubject(false);
  RouteNotificatin$ = this.isRouteNotification$.asObservable();
  isReloadeCompany = this.isAddCompany.asObservable();
  constructor() { }
  
  formateFormData(body){
    const formDate = new FormData();
    for (const key in body) {
      if (Array.isArray(body[key]) && body[key].length > 0) {
        if (Object?.keys(body[key][0])?.length > 1) {
          body[key].forEach((ele: any, index: number) => {
            for (const subkey in ele){
              ele[subkey] ? formDate.append(`${key}[${index}].${subkey}`, ele[subkey]) : EMPTY;
              ele[subkey] === 0 ? formDate.append(`${key}[${index}].${subkey}`, ele[subkey]) : EMPTY;
            }

          })
        }
        else {
          body[key].forEach((ele: any) => {
            formDate.append(key, ele)
          })
        }
      } else {
        typeof body[key] === 'number' ? formDate.append(key, body[key]) : EMPTY;
        typeof body[key] === 'boolean' ? formDate.append(key, body[key]) : EMPTY;
        typeof body[key] === 'string' ? formDate.append(key, body[key]) : EMPTY;
        body[key]?.lastModified ? formDate.append(key, body[key]) : EMPTY;
      }
    }
    return formDate
  }
}
