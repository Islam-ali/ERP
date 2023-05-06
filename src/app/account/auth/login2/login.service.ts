import { Injectable } from '@angular/core';
import { LoginRes } from './login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '@env/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  Login(body:FormGroup) {
    let headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Credentials', 'true')

      return this.http.post<LoginRes>(`${env.domain}dashboard/login`,body,{ 'headers': headers });
  }

}
