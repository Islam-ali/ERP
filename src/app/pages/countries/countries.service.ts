import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Countries } from './countries';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  constructor(private http: HttpClient) { }

  getCountries() {
      return this.http.get<Countries>(`${env.domain}dashboard/countries`);
  }
}
