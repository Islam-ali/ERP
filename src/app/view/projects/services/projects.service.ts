import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { SharedService } from 'app/shared/services/shared.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(
    private http:HttpClient,
    private _SharedService: SharedService
    ) { }

  getAllProjects(companyId:number):Observable<any>{
    return this.http.get(`${env.domain}projects/GetAllProjects/${companyId}`)
  }
  GetAllProjectsByCompanyOrDepartmentId(companyId:number):Observable<any>{
    return this.http.get(`${env.domain}projects/GetAllProjectsByCompanyOrDepartmentId/${companyId}`)
  }
  EditProject(editForm:any):Observable<any>{
    return this.http.put(`${env.domain}Projects/EditProject/${editForm['id']}`,this._SharedService.formateFormData(editForm))
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
    return this.http.post(`${env.domain}projects/AddProject`,this._SharedService.formateFormData(addForm))
  }
  DeleteFileOrMoreOfProject(listOfId:any[]=[]): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(listOfId),
    };
    return this.http.delete<any>(`${env.domain}Projects/DeleteFileOrMoreOfProject`, options)
  }
}
