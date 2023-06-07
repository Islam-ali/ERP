import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isAddCompany:BehaviorSubject<boolean> = new BehaviorSubject(false);
  isReloadeCompany = this.isAddCompany.asObservable();
  constructor() { }
}
