import { Component, OnInit } from '@angular/core';
import { Role } from 'app/core/modal/role';
import { AuthenticationService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  Data: any[] = [
    { title: 'MENUITEMS.DEPARTMENTS.TEXT', value: '', icon: 'bx bx-food-menu',url:'departments' },
    { title: 'MENUITEMS.EMPLOYEES.TEXT', value: '', icon: 'bx bxs-user-detail',url:'employees' },
  ]
  currentUser: any;
  Role: any = Role;
  constructor(private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.getUser();
  }

  ngOnInit(): void {
  }

}
