import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http:HttpClient) { }

  getAllProjects(companyId:number):Observable<any>{
    return this.http.get(`${env.domain}projects/GetAllProjects/${companyId}`)
  }
  GetAllProjectsByCompanyOrDepartmentId(companyId:number):Observable<any>{
    return this.http.get(`${env.domain}projects/GetAllProjectsByCompanyOrDepartmentId/${companyId}`)
  }
  EditProject(editForm:any):Observable<any>{
    return this.http.put(`${env.domain}Projects/EditProject/${editForm['id']}`,editForm)
  }
  getProjectById(projectId:number):Observable<any>{
    return this.http.get(`${env.domain}projects/GetProjectById/${projectId}`)
  }
  ChangeActiveOrNotProject(projectId:number):Observable<any>{
    return this.http.put(`${env.domain}projects/ChangeActiveOrNotProject/${projectId}`,{})
  }
  RemoveProject(projectId:number):Observable<any>{
    return this.http.delete(`${env.domain}projects/RemoveProject/${projectId}`)
  }
  addProject(addForm:any):Observable<any>{
    return this.http.post(`${env.domain}projects/AddProject`,addForm)
  }
}
