import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Countries, ShowCountry } from './countries';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  constructor(private http: HttpClient) { }

  getCountries() {
      return this.http.get<Countries>(`${env.domain}dashboard/countries`);
  }
  addCountry(body:FormData){
    return this.http.post<Countries>(`${env.domain}dashboard/countries` , body);
  }
  updateCountry(body:FormData,CountryId:number){
    return this.http.post<Countries>(`${env.domain}dashboard/countries/${CountryId}?_method=PUT` , body);
  }
  deactivate(CountryId:number) {
    return this.http.get<Countries>(`${env.domain}dashboard/countries/deactivate/${CountryId}`);
  }
  activate(CountryId:number) {
    return this.http.get<Countries>(`${env.domain}dashboard/countries/activate/${CountryId}`);
  }
  delete(CountryId:number) {
    return this.http.delete<Countries>(`${env.domain}dashboard/countries/${CountryId}`);
  }
  showCountries(CountryId:number) {
    return this.http.get<ShowCountry>(`${env.domain}dashboard/countries/${CountryId}`);
  }
//   getUserss() {
//     return this.http.get<any>(`${env.domain}dashboard/users`);
// }
}
