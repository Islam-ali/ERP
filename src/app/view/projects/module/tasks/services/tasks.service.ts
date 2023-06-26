import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { EMPTY, Observable } from 'rxjs';
import { Comments } from '../modal/tasks';
import { FormGroup } from '@angular/forms';
import { SharedService } from 'app/shared/services/shared.service';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(
    private http:HttpClient,
    private _SharedService:SharedService
    ) { }

  getAllTasks(projectId:number):Observable<any>{
    return this.http.get(`${env.domain}Tasks/GetAllTasks/${projectId}`)
  }
  addTask(body:any):Observable<any>{
    return this.http.post(`${env.domain}Tasks/AddTask`,this._SharedService.formateFormData(body))
  }
  EditTask(body:any):Observable<any>{
    return this.http.put(`${env.domain}Tasks/EditTask/${body['Id']}`,this._SharedService.formateFormData(body))
  }
  getTaskById(TaskId:number):Observable<any>{
    return this.http.get(`${env.domain}Tasks/GetTaskById/${TaskId}`)
  }
  ChangeActiveOrNotTask(TaskId:number):Observable<any>{
    return this.http.put(`${env.domain}Tasks/ChangeActiveOrNotTask/${TaskId}`,{})
  }
  RemoveTask(TaskId:number):Observable<any>{
    return this.http.delete(`${env.domain}Tasks/RemoveTask/${TaskId}`)
  }
  ListOfPriorities():Observable<any>{
    return this.http.get(`${env.domain}Tasks/ListOfPriorities`)
  }
  ListOfTasks(TaskId:number):Observable<any>{
    return this.http.get(`${env.domain}Tasks/ListOfTasks/${TaskId}`)
  }
  ListOfTaskStages():Observable<any>{
    return this.http.get(`${env.domain}Tasks/ListOfTaskStages`)
  }
  ListOfEmployees(departmentID:number ):Observable<any>{
    return this.http.get(`${env.domain}Employees/ListOfEmployees/${departmentID}`)
  }
  EditTaskProgressing(body:any):Observable<any>{
    return this.http.put(`${env.domain}Tasks/EditTaskProgressing`,body)
  }
  GetAllTaskComments(TaskId:number):Observable<any> {
    return this.http.get(`${env.domain}Tasks/GetAllTaskComments/${TaskId}`)
  }
  AddTaskComment(body:any){
    return this.http.post(`${env.domain}Tasks/AddTaskComment`,this._SharedService.formateFormData(body))
  }
  AddMentionedEmployees(form:any = {}){
    return this.http.post(`${env.domain}Tasks/AddMentionedEmployees`,form)
  }
  DeleteFileOrMoreOfTasks(listOfId:any[]=[]): Observable<any>{
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(listOfId),
      };
      return this.http.delete<any>(`${env.domain}Tasks/DeleteFileOrMoreOfTask`, options)
    }
    
    GetAllTasksByCompanyOrDepartmentId(companyId:number):Observable<any>{
      return this.http.get(`${env.domain}Tasks/GetAllTasksByCompanyOrDepartmentId/${companyId}`)
    }
    GetDepartmentIdByProjectId(projectID:number):Observable<any> {
      return this.http.get(`${env.domain}Projects/GetDepartmentIdByProjectId/${projectID}`)
    }
  }

