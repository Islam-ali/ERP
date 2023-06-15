import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { EMPTY, Observable } from 'rxjs';
import { Comments } from '../modal/tasks';
import { FormGroup } from '@angular/forms';
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
    for (const key in addForm) {
      if (Array.isArray(addForm[key]) && addForm[key].length > 0) {
        if (Object.keys(addForm[key][0]).length > 1) {
          addForm[key].forEach((ele: any, index: number) => {
            for (const subkey in ele)
              ele['File'] ? formDate.append(`${key}[${index}].${subkey}`, ele[subkey]) : EMPTY;
          })
        }
        else {
          addForm[key].forEach((ele: any) => {
            formDate.append(key, ele)
          })
        }
      } else {
        typeof addForm[key] === 'number' ? formDate.append(key, addForm[key]) : EMPTY;
        typeof addForm[key] === 'boolean' ? formDate.append(key, addForm[key]) : EMPTY;
        typeof addForm[key] === 'string' ? formDate.append(key, addForm[key]) : EMPTY;
        addForm[key]?.lastModified ? formDate.append(key, addForm[key]) : EMPTY;
      }
    }
    return this.http.post(`${env.domain}Tasks/AddTask`,formDate)
  }
  EditTask(editForm:any):Observable<any>{
    const formDate = new FormData();
    for (const key in editForm) {
      if (Array.isArray(editForm[key]) && editForm[key].length > 0) {
        if (Object?.keys(editForm[key][0])?.length > 1) {
          editForm[key].forEach((ele: any, index: number) => {
            for (const subkey in ele)
            subkey ?  formDate.append(`${key}[${index}].${subkey}`, ele[subkey]) : EMPTY;
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
      return this.http.get(`${env.domain}Tasks/GetAllTasksByCompanyOrDepartmentIdy/${companyId}`)
    }
  }

