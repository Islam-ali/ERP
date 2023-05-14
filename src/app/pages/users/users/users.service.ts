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

  getUserss(pageNumber:number) {
      return this.http.get<Users>(`${env.domain}dashboard/users`,{
        params:{page:pageNumber}
      });
  }
  addUser(body:FormData){
    return this.http.post<Users>(`${env.domain}dashboard/users` , body);
  }
  updateUser(body:FormData,userId:number){
    return this.http.post<Users>(`${env.domain}dashboard/users/${userId}?_method=PUT` , body);
  }
  delete(userId:number) {
    return this.http.delete<Users>(`${env.domain}dashboard/users/${userId}`);
  }
}
