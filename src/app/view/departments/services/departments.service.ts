import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  constructor(private http:HttpClient) { }

  getAllDepartments(companyId:number):Observable<any>{
    return this.http.get(`${env.domain}Departments/GetAllDepartments?companyId=${companyId}`)
  }
  getEditDepartment(editForm:any):Observable<any>{
    return this.http.put(`${env.domain}Departments/EditDepartment/${editForm['company_Id']}`,editForm)
  }
  getDepartmentById(projectId:number):Observable<any>{
    return this.http.get(`${env.domain}Departments/GetDepartmentById/${projectId}`)
  }
  ChangeActiveOrNotDepartment(projectId:number):Observable<any>{
    return this.http.put(`${env.domain}Departments/ChangeActiveOrNotDepartment/${projectId}`,{})
  }
  RemoveDepartment(projectId:number):Observable<any>{
    return this.http.delete(`${env.domain}Departments/RemoveDepartment/${projectId}`)
  }
  addDepartment(addForm:any):Observable<any>{
    return this.http.post(`${env.domain}Departments/AddDepartment`,addForm)
  }
}
