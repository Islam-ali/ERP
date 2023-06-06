import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Observable } from 'rxjs';
import { Clients, ListOfClientJobs } from '../modal/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }
  addClient(body:any): Observable<Clients> {
    return this.http.post<Clients>(`${env.domain}Clients/AddClient`, body);
  }
  getClients(): Observable<Clients> {
    return this.http.get<Clients>(`${env.domain}Clients/GetAllClients`);
  }
  getclientById(clientId:number):Observable<any>{
    return this.http.get(`${env.domain}Clients/GetClientById/${clientId}`)
  }
  ChangeActiveOrNotDepartment(clientId:number):Observable<any>{
    return this.http.put(`${env.domain}Clients/ChangeActiveOrNotClient/${clientId}`,{})
  }
  updateClients(value:any,clientId:number):Observable<any>{
    return this.http.put(`${env.domain}Clients/EditClient/${clientId}`,value)
  }
  ListOfClientJobs(JobsID:number):Observable<ListOfClientJobs>{
    return this.http.get<ListOfClientJobs>(`${env.domain}Clients/ListOfClientJobs/${JobsID}`)
  }
  ListOfClientJobCategories():Observable<ListOfClientJobs>{
    return this.http.get<ListOfClientJobs>(`${env.domain}Clients/ListOfClientJobCategories`)
  }
  RemoveClient(clientId):Observable<Clients>{
    return this.http.delete<Clients>(`${env.domain}Clients/RemoveClient/${clientId}`)
  }
}
