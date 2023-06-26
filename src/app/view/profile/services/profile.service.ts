import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { EMPTY, Observable } from 'rxjs';
import { Profile } from '../modal/profile';
import { SharedService } from 'app/shared/services/shared.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private _SharedService: SharedService
    ) { }
  GetEmployeeProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${env.domain}Employees/GetEmployeeProfile`)
  }
  getEditEmployee(body: any): Observable<Profile> {
    return this.http.put<Profile>(`${env.domain}Employees/UpdateEmployeeProfile`, this._SharedService.formateFormData(body))
  }
  DeleteFileOrMoreOfEmployee(listOfId:any[]=[]): Observable<Profile>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(listOfId),
    };
    return this.http.delete<Profile>(`${env.domain}Employees/DeleteFileOrMoreOfEmployee`, options)
  }
}
