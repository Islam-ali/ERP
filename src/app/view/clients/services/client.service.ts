import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { EMPTY, Observable } from 'rxjs';
import { AllClientsComments, Clients, ListOfClientJobs } from '../modal/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }
  addClient(body:any): Observable<Clients> {
    return this.http.post<Clients>(`${env.domain}Clients/AddClient`, body);
  }
  getClients(value:any): Observable<Clients> {
    const data = new HttpParams();
    for(let key in value){
      data.append(`${key}`,`${value[key]}`)
    }
    return this.http.get<Clients>(`${env.domain}Clients/GetAllClients`,{params: value});
  }
  GetAllClientsComments(ClientId:number): Observable<AllClientsComments> {
    return this.http.get<AllClientsComments>(`${env.domain}ClientComments/GetAllClientsComments/${ClientId}`);
  }
  AddClientComment(body:any): Observable<any> {
    const formDate = new FormData();
    for (const key in body) {
      if (Array.isArray(body[key]) && body[key].length > 0) {
        if (Object?.keys(body[key][0])?.length > 1) {
          body[key].forEach((ele: any, index: number) => {
            for (const subkey in ele)
              ele['File'] ? formDate.append(`${key}[${index}].${subkey}`, ele[subkey]) : EMPTY;
          })
        }
        else {
          body[key].forEach((ele: any) => {
            formDate.append(key, ele)
          })
        }
      } else {
        typeof body[key] === 'number' ? formDate.append(key, body[key]) : EMPTY;
        typeof body[key] === 'boolean' ? formDate.append(key, body[key]) : EMPTY;
        typeof body[key] === 'string' ? formDate.append(key, body[key]) : EMPTY;
        body[key]?.lastModified ? formDate.append(key, body[key]) : EMPTY;
      }
    }
    return this.http.post<any>(`${env.domain}ClientComments/AddClientComment`, formDate);
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
  ListOfClientCommunicationWays():Observable<ListOfClientJobs>{
    return this.http.get<ListOfClientJobs>(`${env.domain}Clients/ListOfClientCommunicationWays`)
  }
  RemoveClient(clientId:number):Observable<Clients>{
    return this.http.delete<Clients>(`${env.domain}Clients/RemoveClient/${clientId}`)
  }
  EditClientCommunicationWay(value:any):Observable<any>{
    return this.http.put(`${env.domain}Clients/EditClientCommunicationWay/${value.id}`,value)
  }
}
