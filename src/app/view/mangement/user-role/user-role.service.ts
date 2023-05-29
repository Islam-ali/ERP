import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs';
import { ManageUserRoles, UserRole } from '../modal/user-role';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  constructor(private http:HttpClient) { }
  GetEachUserWithHisRoles(page:number):Observable<UserRole>{
    return this.http.get<UserRole>(`${env.domain}Perm/GetEachUserWithHisRoles?PageSize=10&PageNumber=${page}`)
  }
  ManageUserRolesById(userID:string):Observable<ManageUserRoles>{
    return this.http.get<ManageUserRoles>(`${env.domain}Perm/ManageUserRoles/${userID}`)
  }
  UpdateUserRoles(form:any):Observable<ManageUserRoles>{
    return this.http.post<ManageUserRoles>(`${env.domain}Perm/UpdateUserRoles`,form)
  }
}
