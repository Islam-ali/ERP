import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Classifications, ShowClassification } from './classifications';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClassificationsService {

  constructor(private http: HttpClient) { }

  getFactories(): Observable<Classifications> {
    return this.http.get<Classifications>(`${env.domain}dashboard/factories/classifications`);
  }
  addFactory(body: FormData): Observable<Classifications> {
    return this.http.post<Classifications>(`${env.domain}dashboard/factories/classifications`, body);
  }
  updateFactory(body: FormData, FactoryId: number): Observable<Classifications> {
    return this.http.post<Classifications>(`${env.domain}dashboard/factories/classifications/${FactoryId}?_method=PUT`, body);
  }
  deactivate(FactoryId: number): Observable<Classifications> {
    return this.http.get<Classifications>(`${env.domain}dashboard/factories/classifications/deactivate/${FactoryId}`);
  }
  activate(FactoryId: number): Observable<Classifications> {
    return this.http.get<Classifications>(`${env.domain}dashboard/factories/classifications/activate/${FactoryId}`);
  }
  delete(FactoryId: number): Observable<Classifications> {
    return this.http.delete<Classifications>(`${env.domain}dashboard/factories/classifications/${FactoryId}`);
  }
  showFactory(FactoryId: number): Observable<ShowClassification> {
    return this.http.get<ShowClassification>(`${env.domain}dashboard/factories/classifications/${FactoryId}`);
  }
  getListOfClassifications(): Observable<Classifications> {
    return this.http.get<Classifications>(`${env.domain}dashboard/factories/classifications-selection`);
  }
}
