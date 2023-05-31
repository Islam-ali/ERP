import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs';
import { Permissions } from '../modal/permissions';
@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private http: HttpClient) { }
  GetManageRolePermissions(roleID: string): Observable<Permissions> {
    return this.http.get<Permissions>(`${env.domain}Perm/ManageRolePermissions/${roleID}`)
  }
  UpdateRolePermissions(form: any): Observable<Permissions> {
    return this.http.post<Permissions>(`${env.domain}Perm/UpdateRolePermissions`, form)
  }
}
