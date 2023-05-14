import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Pending } from './pending';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  constructor(private http: HttpClient) { }

  getPending():Observable<Pending> {
      return this.http.get<Pending>(`${env.domain}dashboard/factories/pending-accounts`);
  }
  deactivate(CountryId:number):Observable<Pending> {
    return this.http.get<Pending>(`${env.domain}dashboard/factories/account-deactivate/${CountryId}`);
  }
  activate(CountryId:number):Observable<Pending> {
    return this.http.get<Pending>(`${env.domain}dashboard/factories/account-activate/${CountryId}`);
  }

}
