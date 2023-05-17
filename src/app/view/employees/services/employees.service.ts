import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(private http:HttpClient) { }

  getAllEmployees(companyId:number):Observable<any>{
    const params = new HttpParams();
    // if(companyId != 0){
    //   params.append('companyId',companyId)
    //   console.log(params);
    // }
      return this.http.get(`${env.domain}Employees/GetAllEmployees`,{params:{
        companyId:companyId
      }}
    )
  }
  getEditEmployee(editForm:any):Observable<any>{
    return this.http.put(`${env.domain}Employees/EditEmployee/${editForm['company_Id']}`,editForm)
  }
  getEmployeeById(projectId:number):Observable<any>{
    return this.http.get(`${env.domain}Employees/GetEmployeeById/${projectId}`)
  }
  ChangeActiveOrNotEmployee(projectId:number):Observable<any>{
    return this.http.put(`${env.domain}Employees/ChangeActiveOrNotEmployee/${projectId}`,{})
  }
  RemoveEmployee(projectId:number):Observable<any>{
    return this.http.delete(`${env.domain}Employees/RemoveEmployee/${projectId}`)
  }
  addEmployee(addForm:any):Observable<any>{
    return this.http.post(`${env.domain}Employees/AddEmployee`,addForm)
  }
  ListOfEmployees(companyID:number ):Observable<any>{
    return this.http.get(`${env.domain}Employees/ListOfEmployees/${companyID}`)
  }
  ListOfMilitaryStatus():Observable<any>{
    return this.http.get(`${env.domain}Employees/ListOfMilitaryStatus`)
  }
  ListOfMaritalStatus():Observable<any>{
    return this.http.get(`${env.domain}Employees/ListOfMaritalStatus`)
  }
  ListOfStatus():Observable<any>{
    return this.http.get(`${env.domain}Employees/ListOfStatus`)
  }
  ListOfStates():Observable<any>{
    return this.http.get(`${env.domain}Employees/ListOfStates`)
  }
  ListOfRegions(stateID:number):Observable<any>{
    return this.http.get(`${env.domain}Employees/ListOfRegions/${stateID}`)
  }
  ListOfGenders():Observable<any>{
    return this.http.get(`${env.domain}Employees/ListOfGenders`)
  }


}
