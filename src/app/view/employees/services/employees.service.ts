import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { SharedService } from 'app/shared/services/shared.service';
import { EMPTY, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(
    private http: HttpClient,
    private _SharedService: SharedService
    ) { }

  getAllEmployees(companyId: number): Observable<any> {
    const params = new HttpParams();
    // if(companyId != 0){
    //   params.append('companyId',companyId)
    //   console.log(params);
    // }
    return this.http.get(`${env.domain}Employees/GetAllEmployees`, {
      params: {
        companyId: companyId
      }
    }
    )
  }
  getEditEmployee(body: any): Observable<any> {
    return this.http.put(`${env.domain}Employees/EditEmployee/${body['id']}`, this._SharedService.formateFormData(body) )
  }
  getEmployeeById(projectId: number): Observable<any> {
    return this.http.get(`${env.domain}Employees/GetEmployeeById/${projectId}`)
  }
  ChangeActiveOrNotEmployee(projectId: number): Observable<any> {
    return this.http.put(`${env.domain}Employees/ChangeActiveOrNotEmployee/${projectId}`, {})
  }
  RemoveEmployee(projectId: number): Observable<any> {
    return this.http.delete(`${env.domain}Employees/RemoveEmployee/${projectId}`)
  }
  addEmployee(body: any): Observable<any> {
    return this.http.post(`${env.domain}Employees/AddEmployee`,  this._SharedService.formateFormData(body))
  }
  ListOfEmployees(companyID: number): Observable<any> {
    return this.http.get(`${env.domain}Employees/ListOfEmployees/${companyID}`)
  }
  ListOfMilitaryStatus(): Observable<any> {
    return this.http.get(`${env.domain}Employees/ListOfMilitaryStatus`)
  }
  ListOfMaritalStatus(): Observable<any> {
    return this.http.get(`${env.domain}Employees/ListOfMaritalStatus`)
  }
  ListOfStatus(): Observable<any> {
    return this.http.get(`${env.domain}Employees/ListOfStatus`)
  }
  ListOfStates(): Observable<any> {
    return this.http.get(`${env.domain}Employees/ListOfStates`)
  }
  ListOfRegions(stateID: number): Observable<any> {
    return this.http.get(`${env.domain}Employees/ListOfRegions/${stateID}`)
  }
  ListOfGenders(): Observable<any> {
    return this.http.get(`${env.domain}Employees/ListOfGenders`)
  }
  ListOfEmployeesForMentioned(departmentID:number):Observable<any>{
    return this.http.get(`${env.domain}Employees/ListOfEmployeesForMentioned/${departmentID}`)
  }
  DeleteFileOrMoreOfEmployee(listOfId:any[]=[]): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(listOfId),
    };
    return this.http.delete<any>(`${env.domain}Employees/DeleteFileOrMoreOfEmployee`, options)
  }
}
