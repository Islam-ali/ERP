import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Countries, ShowCountry } from './countries';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  constructor(private http: HttpClient) { }

  getCountries():Observable<Countries> {
      return this.http.get<Countries>(`${env.domain}dashboard/countries`);
  }
  addCountry(body:FormData):Observable<Countries>{
    return this.http.post<Countries>(`${env.domain}dashboard/countries` , body);
  }
  updateCountry(body:FormData,CountryId:number):Observable<Countries>{
    return this.http.post<Countries>(`${env.domain}dashboard/countries/${CountryId}?_method=PUT` , body);
  }
  deactivate(CountryId:number):Observable<Countries> {
    return this.http.get<Countries>(`${env.domain}dashboard/countries/deactivate/${CountryId}`);
  }
  activate(CountryId:number):Observable<Countries> {
    return this.http.get<Countries>(`${env.domain}dashboard/countries/activate/${CountryId}`);
  }
  delete(CountryId:number):Observable<Countries> {
    return this.http.delete<Countries>(`${env.domain}dashboard/countries/${CountryId}`);
  }
  showCountries(CountryId:number):Observable<ShowCountry> {
    return this.http.get<ShowCountry>(`${env.domain}dashboard/countries/${CountryId}`);
  }
  getListOfCountries():Observable<Countries> {
    return this.http.get<Countries>(`${env.domain}dashboard/factories/Countries-selection`);
  }
//   getUserss() {
//     return this.http.get<any>(`${env.domain}dashboard/users`);
// }
}
