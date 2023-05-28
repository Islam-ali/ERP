import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { EMPTY, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private http: HttpClient) { }
  GetNotificationsMessages() {
    return this.http.put(`${env.domain}Notifications/GetNotificationsMessages`,{})
  }
  GetNotificationsCount() {
    return this.http.get(`${env.domain}Notifications/GetNotificationsCount`)
  }
}
