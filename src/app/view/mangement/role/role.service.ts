import { Injectable } from '@angular/core';
import { allRole } from '../modal/role';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) { }

  GetAllRoles(): Observable<allRole> {
    return this.http.get<allRole>(`${env.domain}Perm/GetAllRoles`);
  }
  CreateRole(body:any): Observable<allRole> {
    const headers= new HttpHeaders().set('content-type', 'application/json')
    return this.http.post<allRole>(`${env.domain}Perm/CreateRole`, body ,  { 'headers': headers });
  }
  UpdateRole(body: any, RoleID: number): Observable<allRole> {
    return this.http.put<allRole>(`${env.domain}Perm/UpdateRole/${RoleID}`, body);
  }
  delete(RoleById: number): Observable<allRole> {
    return this.http.delete<allRole>(`${env.domain}Perm/DeleteRoleById/${RoleById}`);
  }
}
