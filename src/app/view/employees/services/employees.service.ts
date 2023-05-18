import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { EMPTY, Observable } from 'rxjs';
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
    const formDate = new FormData();
    for(const key in editForm){
      if(Array.isArray(editForm[key])){
        editForm[key].forEach((ele:any)=>{
          formDate.append(key ,ele)
        })
      }else{
        typeof editForm[key] === 'number' ? formDate.append(key ,editForm[key]) : EMPTY;
        typeof editForm[key] === 'boolean' ? formDate.append(key ,editForm[key]) : EMPTY;
        typeof editForm[key] === 'string'  ? formDate.append(key ,editForm[key]) : EMPTY;
      }
    }
    return this.http.put(`${env.domain}Employees/EditEmployee/${editForm['id']}`,formDate)
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
    return this.http.post(`${env.domain}Employees/AddEmployee`,formDate)
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
