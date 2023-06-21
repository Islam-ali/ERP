import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http:HttpClient) { }

  getAllJobs(companyID:number):Observable<any>{
    return this.http.get(`${env.domain}Jobs/GetAllJobs?Company_Id=${companyID}`)
  }
  EditJob(editForm:any):Observable<any>{
    return this.http.put(`${env.domain}Jobs/EditJob/${editForm['id']}`,editForm)
  }
  getJobById(JobId:number):Observable<any>{
    return this.http.get(`${env.domain}Jobs/GetJobById/${JobId}`)
  }
  ChangeActiveOrNotJob(JobId:number):Observable<any>{
    return this.http.put(`${env.domain}Jobs/ChangeActiveOrNotJob/${JobId}`,{})
  }
  RemoveJob(JobId:number):Observable<any>{
    return this.http.delete(`${env.domain}Jobs/RemoveJob/${JobId}`)
  }
  addJob(addForm:any):Observable<any>{
    return this.http.post(`${env.domain}Jobs/AddJob`,addForm)
  }
  ListOfJob(DepartmentID:number):Observable<any>{
    return this.http.get(`${env.domain}Jobs/ListOfJobs?Department_Id=${DepartmentID}`)
  }
}
