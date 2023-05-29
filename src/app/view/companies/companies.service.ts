import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {


  constructor(private http:HttpClient) { }

  getAllCompanies():Observable<any>{
    return this.http.get(`${env.domain}Companies/GetAllCompanies`)
  }
  EditCompany(editForm:any):Observable<any>{
    return this.http.put(`${env.domain}Companies/EditCompany/${editForm['id']}`,editForm)
  }
  getCompanyById(projectId:number):Observable<any>{
    return this.http.get(`${env.domain}Companies/GetCompanyById/${projectId}`)
  }
  ChangeActiveOrNotCompany(projectId:number):Observable<any>{
    return this.http.put(`${env.domain}Companies/ChangeActiveOrNotCompany/${projectId}`,{})
  }
  RemoveCompany(projectId:number):Observable<any>{
    return this.http.delete(`${env.domain}Companies/RemoveCompany/${projectId}`)
  }
  addCompany(addForm:any):Observable<any>{
    return this.http.post(`${env.domain}Companies/AddCompany`,addForm)
  }
}
