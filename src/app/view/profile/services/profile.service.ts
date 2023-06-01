import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { EMPTY, Observable } from 'rxjs';
import { Profile } from '../modal/profile';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }
  GetEmployeeProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${env.domain}Employees/GetEmployeeProfile`)
  }
  getEditEmployee(editForm: any): Observable<Profile> {
    const formDate = new FormData();
    for (const key in editForm) {
      if (Array.isArray(editForm[key]) && editForm[key].length > 0) {
        if (Object?.keys(editForm[key][0])?.length > 1) {
          editForm[key].forEach((ele: any, index: number) => {
            for (const subkey in ele)
              ele['File'] ? formDate.append(`${key}[${index}].${subkey}`, ele[subkey]) : EMPTY;
          })
        }
        else {
          editForm[key].forEach((ele: any) => {
            formDate.append(key, ele)
          })
        }
      } else {
        typeof editForm[key] === 'number' ? formDate.append(key, editForm[key]) : EMPTY;
        typeof editForm[key] === 'boolean' ? formDate.append(key, editForm[key]) : EMPTY;
        typeof editForm[key] === 'string' ? formDate.append(key, editForm[key]) : EMPTY;
        editForm[key]?.lastModified ? formDate.append(key, editForm[key]) : EMPTY;
      }
    }
    return this.http.put<Profile>(`${env.domain}Employees/UpdateEmployeeProfile`, formDate)
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
