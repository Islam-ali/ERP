import { Injectable } from '@angular/core';
import { LoginRes } from './login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '@env/environment';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  Login(body:FormGroup):Observable<LoginRes> {
    let headers = new HttpHeaders();
    const lang = JSON.parse(localStorage.getItem('lang'))?.lang || 'ar'
    headers = headers.set('Accept-Language',lang); 
      return this.http.post<LoginRes>(`${env.domain}dashboard/login`,body,{headers:headers});
  }

}
