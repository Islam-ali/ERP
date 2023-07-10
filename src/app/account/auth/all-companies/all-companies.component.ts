import { Component, OnInit } from '@angular/core';
import { SharedService } from 'app/shared/services/shared.service';
import { CompaniesService } from 'app/view/companies/companies.service';
import { Company, DataAllCompanies } from 'app/view/companies/modal/companies';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.scss']
})
export class AllCompaniesComponent implements OnInit {
  loadingAllCompanies: boolean = true;
  allCompanies: DataAllCompanies[] = [];

  constructor(
    private _CompaniesService: CompaniesService,
    private _SharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getAllCompanies()
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
  sendCompanyId(id) {
    this._SharedService.getRoute(id);
  }
}
