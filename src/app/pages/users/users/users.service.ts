import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Users } from './users';
import { environment as env } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  getUserss() {
      return this.http.get<Users>(`${env.domain}dashboard/users`);
  }
  addUser(body:FormData){
    return this.http.post<Users>(`${env.domain}dashboard/users` , body);
  }
}
