import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Services } from './services';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(private http: HttpClient) { }

  getServices() {
      return this.http.get<Services>(`${env.domain}dashboard/services`);
  }
  addService(body:FormData){
    return this.http.post<Services>(`${env.domain}dashboard/services` , body);
  }
  updateService(body:FormData,ServiceId:number){
    return this.http.post<Services>(`${env.domain}dashboard/services/${ServiceId}?_method=PUT` , body);
  }
  deactivate(ServiceId:number) {
    return this.http.get<Services>(`${env.domain}dashboard/services/deactivate/${ServiceId}`);
  }
  activate(ServiceId:number) {
    return this.http.get<Services>(`${env.domain}dashboard/services/activate/${ServiceId}`);
  }
  delete(ServiceId:number) {
    return this.http.delete<Services>(`${env.domain}dashboard/services/${ServiceId}`);
  }
}
