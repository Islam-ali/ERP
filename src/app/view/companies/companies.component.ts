import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company, DataAllCompanies } from './modal/companies';
import { CompaniesService } from './companies.service';
import { Error } from 'app/core/helpers/error';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  loadingAllCompanies: boolean = true;
  loadingFormCompany: boolean = false;
  allCompanies: DataAllCompanies[] = [];
  companyForm!: FormGroup;
  displayPosition!: boolean;
  position!: string;
  label: string = 'add';
  lableForm: number = 0;
  companyId: number = 0;
  loadingShow: boolean = false;
  loadingCompany: boolean = false;

  constructor(
    private _CompaniesService: CompaniesService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private _ActivatedRoute: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    this.companyForm = this.initFormCompany()
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
  // initial form Edit Company
  initFormCompany(): FormGroup {
    return this.companyForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      nameInEnglish: ['', [Validators.required]],
      address: ['', [Validators.required]]
    })
  }
  openModal(content: any, num: number): void {
    this.lableForm = num;
    this.companyForm.reset();
    // num == 1 ? this.patchValueForm() : EMPTY
    this.modalService.open(content);
  }
  patchValueForm(content: any, Company: any) {
    this.lableForm = 1;
    this.showCompany(Company.id);
    console.log(Company.id);

    this.companyId = Company.id;
    this.modalService.open(content);
  }
  showCompany(companyID: number) {
    this.getUpdateCompany(companyID)
    this.loadingShow = true;
    this._CompaniesService.getCompanyById(companyID).subscribe({
      next: (res: any) => {
        this.loadingShow = false;
        this.companyForm.patchValue({
          name: res.data.name,
          nameInEnglish: res.data.nameInEnglish,
          department_Id: res.data.department_Id,

        })
      }, error: (err: Error) => {
        this.loadingShow = false;
      }
    })
  }
  getUpdateCompany(companyId: number): number {
    return companyId
  }
  EditCompanyById(): void {
    let value = this.companyForm.value
    value['id'] = this.companyId;
    this._CompaniesService.getEditCompany(value).subscribe({
      next: (res: any) => {
        this.getAllCompanies();
        this.loadingCompany = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingCompany = false;
        this.toastrService.error(err.message);
      }
    })
  }
  AddCompany(): void {
    let value = this.companyForm.value
    this._CompaniesService.addCompany(value).subscribe({
      next: (res: any) => {
        this.getAllCompanies();
        this.loadingCompany = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingCompany = false;
        this.toastrService.error(err.message);
      }
    })
  }

  remove(companyId: number) {
    this._CompaniesService.RemoveCompany(companyId).subscribe({
      next: (res: any) => {
        this.getAllCompanies();
        this.toastrService.error(res.message);
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
      }
    })
  }
  onSubmit() {
    this.loadingCompany = true;
    if (this.lableForm === 0 && this.companyForm.invalid) {
      return
    } else {
      this.lableForm === 0 ? this.AddCompany() : this.EditCompanyById();
    }
  }
  get form() {
    return this.companyForm.controls;
  }
  addCompany(label: string) {
    this.label = label
  }
  ChangeActiveOrNotCompany(ServiceId: number) {
    this._CompaniesService.ChangeActiveOrNotCompany(ServiceId).subscribe({
      next: (res: Company) => {
        this.getAllCompanies();
        if (res.isActive) {
          this.toastrService.success(res.message);
        } else {
          this.toastrService.warning(res.message);
        }
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
      }
    })
  }
}
