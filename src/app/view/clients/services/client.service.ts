import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { EMPTY, Observable } from 'rxjs';
import { AllClientsComments, Clients, ListOfClientJobs } from '../modal/clients';
import { SharedService } from 'app/shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(
    private http: HttpClient,
    private _SharedService : SharedService
    ) { }
  addClient(body:any): Observable<Clients> {
    return this.http.post<Clients>(`${env.domain}Clients/AddClient`, this._SharedService.formateFormData(body));
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
    return this.http.post<any>(`${env.domain}ClientComments/AddClientComment`, this._SharedService.formateFormData(body));
  }
  getclientById(clientId:number):Observable<any>{
    return this.http.get(`${env.domain}Clients/GetClientById/${clientId}`)
  }
  ChangeActiveOrNotDepartment(clientId:number):Observable<any>{
    return this.http.put(`${env.domain}Clients/ChangeActiveOrNotClient/${clientId}`,{})
  }
  updateClients(body:any,clientId:number):Observable<any>{
    return this.http.put(`${env.domain}Clients/EditClient/${clientId}`, this._SharedService.formateFormData(body))
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
  EditClientStatus(value:any):Observable<any>{
    return this.http.put(`${env.domain}Clients/EditClientStatus/${value.id}`,value)
  }
  ListOfClientTypes():Observable<ListOfClientJobs>{
    return this.http.get<ListOfClientJobs>(`${env.domain}Clients/ListOfClientTypes`)
  }
  ListOfLotsOfClientStatus():Observable<ListOfClientJobs>{
    return this.http.get<ListOfClientJobs>(`${env.domain}Clients/ListOfLotsOfClientStatus`)
  }
  ListOfClientSources():Observable<ListOfClientJobs>{
    return this.http.get<ListOfClientJobs>(`${env.domain}Clients/ListOfClientSources`)
  }
  ListOfClientContactImportances():Observable<ListOfClientJobs>{
    return this.http.get<ListOfClientJobs>(`${env.domain}Clients/ListOfClientContactImportances`)
  }
  ListOfClients(value:any):Observable<ListOfClientJobs>{
    const data = new HttpParams();
    for(let key in value){
      data.append(`${key}`,`${value[key]}`)
    }
    return this.http.get<ListOfClientJobs>(`${env.domain}Clients/ListOfClients`,{params: value})
  }
  DeleteFileOrMoreOfClient(listOfId:any[]=[]): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(listOfId),
    };
    return this.http.delete<any>(`${env.domain}Clients/DeleteFileOrMoreOfClient`, options)
  }
}
