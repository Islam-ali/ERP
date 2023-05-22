import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { EMPTY, Observable } from 'rxjs';
import { Comments } from '../modal/tasks';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http:HttpClient) { }

  getAllTasks(projectId:number):Observable<any>{
    return this.http.get(`${env.domain}Tasks/GetAllTasks/${projectId}`)
  }
  addTask(addForm:any):Observable<any>{
    const formDate = new FormData();
    for(const key in addForm){
      if(Array.isArray(addForm[key])){
        addForm[key].forEach((ele:any)=>{
          formDate.append(key ,ele)
        })
      }else{
        addForm[key] ? formDate.append(key ,addForm[key]) : EMPTY;
      }
    } 
    return this.http.post(`${env.domain}Tasks/AddTask`,formDate)
  }
  EditTask(editForm:any):Observable<any>{
    const formDate = new FormData();
    for(const key in editForm){
      if(Array.isArray(editForm[key])){
        editForm[key].forEach((ele:any)=>{
          formDate.append(key ,ele)
        })
      }else{
        editForm[key] ? formDate.append(key ,editForm[key]) : EMPTY;
      }
    } 
    return this.http.put(`${env.domain}Tasks/EditTask/${editForm['Id']}`,formDate)
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
    return this.http.post(`${env.domain}Tasks/AddTaskComment`,body)
  }

}
