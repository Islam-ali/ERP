import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '@env/environment';
import { Factories } from './factories';
@Injectable({
  providedIn: 'root'
})
export class FactoriesServies {
  constructor(private http: HttpClient) { }

  getFactories() {
      return this.http.get<Factories>(`${env.domain}dashboard/factories/classifications`);
  }
  addFactory(body:FormData){
    return this.http.post<Factories>(`${env.domain}dashboard/factories/classifications` , body);
  }
  updateFactory(body:FormData,FactoryId:number){
    return this.http.post<Factories>(`${env.domain}dashboard/factories/classifications/${FactoryId}?_method=PUT` , body);
  }
  deactivate(FactoryId:number) {
    return this.http.get<Factories>(`${env.domain}dashboard/factories/classifications/deactivate/${FactoryId}`);
  }
  activate(FactoryId:number) {
    return this.http.get<Factories>(`${env.domain}dashboard/factories/classifications/activate/${FactoryId}`);
  }
  delete(FactoryId:number) {
    return this.http.delete<Factories>(`${env.domain}dashboard/factories/classifications/${FactoryId}`);
  }
}
