import { Component, OnInit } from '@angular/core';
import { Role } from 'app/core/modal/role';
import { AuthenticationService } from 'app/core/services/auth.service';
import { environment as env } from '@env/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  URL:string = env.url
  Data: any[] = [
    { title: 'MENUITEMS.DEPARTMENTS.TEXT', value: '', icon: 'bx bx-food-menu',url:'departments' },
    { title: 'MENUITEMS.EMPLOYEES.TEXT', value: '', icon: 'bx bxs-user-detail',url:'employees' },
  ]
  currentUser: any;
  Role: any = Role;
  constructor(    public _AuthenticationService : AuthenticationService    ) {
    this.currentUser = this._AuthenticationService.getUser();
  }

  ngOnInit(): void {
  }

}
