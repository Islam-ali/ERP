import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '@env/environment';
import { EMPTY, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DailyTasksService {

  constructor(private http: HttpClient) { }

  AddDailyTask(value:any): Observable<any> {
    return this.http.post<any>(`${env.domain}DailyTasks/AddDailyTask` , value)
  }
  GetAllDailyTasks():Observable<any> {
    return this.http.get<any>(`${env.domain}DailyTasks/GetAllDailyTasks`)
  }
  
}
