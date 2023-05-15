import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company, DataAllCompanies } from './modal/companies';
import { CompaniesService } from './companies.service';
import { Error } from 'app/core/helpers/error';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  loadingAllCompanies: boolean = true;
  loadingFormCompany: boolean = false;
  allCompanies: DataAllCompanies[] = [];
  addCompanyForm!: FormGroup;
  displayPosition!: boolean;
  position!: string;
  label:string= 'add';
  constructor(
    private _CompaniesService: CompaniesService,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) {
  }
  ngOnInit(): void {
    this.addCompanyForm = this.initFormCompany()
    this.getAllCompanies();
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
  // initial form Edit project
  initFormCompany(): FormGroup {
    return this.addCompanyForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      nameInEnglish: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
    })
  }
  addProject(label:string){
    this.label = label 
  }
  // get Add company
  submitFormCompany() {
    this.loadingFormCompany = true;
    this._CompaniesService.addCompany(this.addCompanyForm.value).subscribe({
      next: (res: Company) => {
        this.loadingFormCompany = false;
        this.toastrService.success(res.message);
        this.getAllCompanies();
        this.displayPosition = false
        this.addCompanyForm.reset();
      },
      error: (err: Error) => {
        this.loadingFormCompany = false;
        this.toastrService.error(err.message);

        // this.addCompanyForm.reset();
      }
    })
  }
  get f(){
    return this.addCompanyForm.controls
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  ChangeActiveOrNotCompany(ServiceId: number) {
    this._CompaniesService.ChangeActiveOrNotCompany(ServiceId).subscribe({
      next: (res: Company) => {
        this.getAllCompanies();
        if(res.isActive){
          this.toastrService.success(res.message);
        }else{
          this.toastrService.warning(res.message);
        }
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
      }
    })
  }
}
