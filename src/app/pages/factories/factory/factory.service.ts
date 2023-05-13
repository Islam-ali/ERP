import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Factory, FactoryProfile } from './factory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {
  constructor(private http: HttpClient) { }
  addFactory(body: FormData): Observable<Factory> {
    return this.http.post<Factory>(`${env.domain}dashboard/factories/add-factory`, body);
  }
  getFactories(classificationID: number, pageNumber: number): Observable<Factory> {
    return this.http.get<Factory>(`${env.domain}dashboard/factories/classification-factories/${classificationID}?page=${pageNumber}`);
  }
  deactivate(FactoryId: number): Observable<Factory> {
    return this.http.get<Factory>(`${env.domain}dashboard/factories/account-deactivate/${FactoryId}`);
  }
  activate(FactoryId: number): Observable<Factory> {
    return this.http.get<Factory>(`${env.domain}dashboard/factories/account-activate/${FactoryId}`);
  }
  factoryProfile(FactoryId: number): Observable<FactoryProfile>{
    return this.http.get<FactoryProfile>(`${env.domain}dashboard/factories/factory-profile/${FactoryId}`);
  }
  // delete(FactoryId: number) {
  //   return this.http.delete<Factory>(`${env.domain}dashboard/factories/classifications/${FactoryId}`);
  // }
}
