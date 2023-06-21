import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '@env/environment';
import { EMPTY, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DailyTasksService {

  constructor(private http: HttpClient) { }

  AddDailyTask(body:any): Observable<any> {
    const formDate = new FormData();
    for (const key in body) {
      if (Array.isArray(body[key]) && body[key].length > 0) {
        if (Object?.keys(body[key][0])?.length > 1) {
          body[key].forEach((ele: any, index: number) => {
            for (const subkey in ele)
              ele['File'] ? formDate.append(`${key}[${index}].${subkey}`, ele[subkey]) : EMPTY;
          })
        }
        else {
          body[key].forEach((ele: any) => {
            formDate.append(key, ele)
          })
        }
      } else {
        typeof body[key] === 'number' ? formDate.append(key, body[key]) : EMPTY;
        typeof body[key] === 'boolean' ? formDate.append(key, body[key]) : EMPTY;
        typeof body[key] === 'string' ? formDate.append(key, body[key]) : EMPTY;
        body[key]?.lastModified ? formDate.append(key, body[key]) : EMPTY;
      }
    }
    return this.http.post<any>(`${env.domain}DailyTasks/AddDailyTask` , formDate)
  }
  GetAllDailyTasks(filter:any):Observable<any> {
    let params = new HttpParams();
    for(let item in filter)
    if (filter[item]) {
        params = params.set(item, filter[item])
    }
    return this.http.get<any>(`${env.domain}DailyTasks/GetAllDailyTasks`,{params})
  }
  
}
