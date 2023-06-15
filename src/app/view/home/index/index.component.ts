import { Component, OnInit } from '@angular/core';
import { Role } from 'app/core/modal/role';
import { AuthenticationService } from 'app/core/services/auth.service';
import { environment as env } from '@env/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Company, DataAllCompanies } from 'app/view/companies/modal/companies';
import { CompaniesService } from 'app/view/companies/companies.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  allCompanies: DataAllCompanies[] = [];
  URL: string = env.url
  Data: any[] = [
    { title: 'MENUITEMS.DEPARTMENTS.TEXT', value: '', icon: 'bx bx-food-menu', url: 'departments', permission: 'Permissions.Departments.All' },
    { title: 'MENUITEMS.EMPLOYEES.TEXT', value: '', icon: 'bx bxs-user-detail', url: 'employees', permission: 'Permissions.Employees.All' },
  ]
  currentUser: any;
  Role: any = Role;
  carouselOption: OwlOptions = {
    items: 4,
    loop: false,
    margin: 0,
    nav: true,
    dots: true,
    responsive: {
      992: {
        items: 4
      },
      768: {
        items: 3
      },
      600: {
        items: 2
      },
      400:{
        items:1
      }
    }
  }
  loadingAllCompanies: boolean = true;
  constructor(
    public _AuthenticationService: AuthenticationService,
    private _CompaniesService: CompaniesService,
  ) {
    this.currentUser = this._AuthenticationService.getUser();

  }

  // get all Companies
  getAllCompanies() {
    this._CompaniesService.getAllCompanies().subscribe({
      next: (res: Company) => {
        this.loadingAllCompanies = false;
        this.allCompanies = res.data
      }, error: (err: Error) => {
        this.loadingAllCompanies = false;
      }
    })
  }
  ngOnInit(): void {
    this.getAllCompanies();
  }

}
