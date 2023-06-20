import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '@env/environment';
import { EMPTY, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OwnedTasksService {
  constructor(private http: HttpClient) { }
  GetAllOwnedTasks(pageNumber:number): Observable<any> {
    return this.http.get<any>(`${env.domain}OwnedTasks/GetAllOwnedTasks?PageSize=10&PageNumber=${pageNumber}`)
  }
  addOwnedTask(form:any = {}){
    const formDate = new FormData();
    for (const key in form) {
      if (Array.isArray(form[key]) && form[key].length > 0) {
        if (Object?.keys(form[key][0])?.length > 1) {
          form[key].forEach((ele: any, index: number) => {
            for (const subkey in ele)
              ele['File'] ? formDate.append(`${key}[${index}].${subkey}`, ele[subkey]) : EMPTY;
          })
        }
        else {
          form[key].forEach((ele: any) => {
            formDate.append(key, ele)
          })
        }
      } else {
        typeof form[key] === 'number' ? formDate.append(key, form[key]) : EMPTY;
        typeof form[key] === 'boolean' ? formDate.append(key, form[key]) : EMPTY;
        typeof form[key] === 'string' ? formDate.append(key, form[key]) : EMPTY;
        form[key]?.lastModified ? formDate.append(key, form[key]) : EMPTY;
      }
    }
    return this.http.post(`${env.domain}OwnedTasks/AddOwnedTask`, formDate)
  }
  ChangeActiveOrNotOwnedTask(TaskId:number):Observable<any>{
    return this.http.put(`${env.domain}OwnedTasks/ChangeActiveOrNotOwnedTask/${TaskId}`,{})
  }
  RemoveOwnedTask(TaskId:number):Observable<any>{
    return this.http.delete(`${env.domain}OwnedTasks/RemoveOwnedTask/${TaskId}`,{})
  }
}
