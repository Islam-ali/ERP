import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isAddCompany:BehaviorSubject<boolean> = new BehaviorSubject(false);
  isRouteNotification$:BehaviorSubject<boolean> = new BehaviorSubject(false);
  companyID:BehaviorSubject<number> = new BehaviorSubject(+localStorage.getItem('companyId') | 0);
  RouteNotificatin$ = this.isRouteNotification$.asObservable();
  isReloadeCompany = this.isAddCompany.asObservable();
  companyID$ = this.companyID.asObservable();

  constructor(private _ActivatedRoute: ActivatedRoute) { }
  
  getRoute(companyId:number){
    this.companyID.next(companyId);
    localStorage.setItem('companyId',`${companyId}`)
  }
  formateFormData(body){
    const formDate = new FormData();
    for (const key in body) {
      if (Array.isArray(body[key]) && body[key].length > 0) {
        if (Object?.keys(body[key][0])?.length > 1) {
          body[key].forEach((ele: any, index: number) => {
            for (const subkey in ele){
              console.log(ele);
              
              ele[subkey] && subkey != 'path' ? formDate.append(`${key}[${index}].${subkey}`, ele[subkey]) : EMPTY;
              ele[subkey] === 0 && subkey != 'path' ? formDate.append(`${key}[${index}].${subkey}`, ele[subkey]) : EMPTY;
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
