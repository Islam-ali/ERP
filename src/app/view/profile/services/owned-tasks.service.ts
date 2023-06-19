import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OwnedTasksService {
  constructor(private http: HttpClient) { }
  GetAllOwnedTasks(): Observable<any> {
    return this.http.get<any>(`${env.domain}OwnedTasks/GetAllOwnedTasks`)
  }
  addOwnedTask(form:any = {}){
    return this.http.post(`${env.domain}OwnedTasks/AddOwnedTask`, form)
  }
  ChangeActiveOrNotOwnedTask(TaskId:number):Observable<any>{
    return this.http.put(`${env.domain}OwnedTasks/ChangeActiveOrNotOwnedTask/${TaskId}`,{})
  }
  RemoveOwnedTask(TaskId:number):Observable<any>{
    return this.http.delete(`${env.domain}OwnedTasks/RemoveOwnedTask/${TaskId}`,{})
  }
}
