import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../services/departments.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataAllDepartments, DepartmentById, Departments } from '../../modal/departments';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { AuthenticationService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  DepartmentForm: FormGroup;
  image: any;
  submit: boolean = false;
  allDepartments: DataAllDepartments[] = [];
  lableForm: number = 0;
  DepartmentId: number = 0;
  loadingStatus: boolean = false;
  loadingDepartments: boolean = false;
  loader: boolean = true;
  rangeValue: number = 0;
  loadingShow: boolean = false;
  companyID:number = 0 ;
  constructor(
    private _formBuilder: FormBuilder,
    private _DepartmentsService: DepartmentsService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    public _AuthenticationService : AuthenticationService

  ) {
    this.companyID = this._ActivatedRoute.snapshot.params['companyID']
    this.DepartmentForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      nameInEnglish: [null, [Validators.required]],
      company_Id: this.companyID
    });
  }

  ngOnInit(): void {

    this.getDepartments();
  }
  getDepartments(): void {
    this._DepartmentsService.getAllDepartments(this.companyID).subscribe({
      next: (res: Departments) => {
        this.allDepartments = res.data;
        this.loader = false;
      }
    })
  }
  uploadeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.image = event.target.files.item(0)
      reader.onload = (event: any) => {
        this.DepartmentForm.patchValue({
          image: event.target.result
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  // 0 : add
  // 1 : Edit
  openModal(content: any, num: number): void {
    this.lableForm = num;
    this.DepartmentForm.reset();
    this.image = null;
    this.rangeValue = 0;
    // num == 1 ? this.patchValueForm() : EMPTY
    this.modalService.open(content);
  }
  patchValueForm(content: any, Factory: any) {
    this.lableForm = 1;
    this.showDepartment(Factory.id)
    this.modalService.open(content);
  }
  showDepartment(departmentID: number) {
    this.getUpdateDepartment(departmentID)
    this.loadingShow = true;
    this._DepartmentsService.getDepartmentById(departmentID).subscribe({
      next: (res: DepartmentById) => {
        this.loadingShow = false;
        this.DepartmentForm.patchValue({
          name: res.data.name,
          nameInEnglish: res.data.nameInEnglish,
          company_Id: res.data.company_Id
        })
      }, error: (err: Error) => {
        this.loadingShow = false;
      }
    })
  }
  getUpdateDepartment(DepartmentId: number): number {
    this.DepartmentId = DepartmentId;
    return DepartmentId
  }
  EditDepartmentById(): void {
    let value = this.DepartmentForm.value
    value['id'] = this.DepartmentId;
    this._DepartmentsService.getEditDepartment(value).subscribe({
      next: (res: Departments) => {
        this.getDepartments();
        this.loadingDepartments = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingDepartments = false;
        this.toastrService.error(`${err}`);
      }
    })
  }
  AddDepartment(): void {
    let value = this.DepartmentForm.value;
    value['company_Id'] = this.companyID;
    this._DepartmentsService.addDepartment(value).subscribe({
      next: (res: Departments) => {
        this.getDepartments();
        this.loadingDepartments = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingDepartments = false;
        this.toastrService.error(`${err}`);
      }
    })
  }

  ChangeActiveOrNotDepartment(DepartmentId: number) {
    this._DepartmentsService.ChangeActiveOrNotDepartment(DepartmentId).subscribe({
      next: (res: Departments) => {
        this.getDepartments();
        if (res.isActive) {
          this.toastrService.success(res.message);
        } else {
          this.toastrService.warning(res.message);
        }
      }, error: (err: Error) => {
        this.toastrService.error(`${err}`);
      }
    })
  }
  delete(DepartmentId: number) {
    this._DepartmentsService.RemoveDepartment(DepartmentId).subscribe({
      next: (res: Departments) => {
        this.getDepartments();
        this.toastrService.error(res.message);
      }, error: (err: Error) => {
        this.toastrService.error(`${err}`);
      }
    })
  }
  onSubmit() {
    this.loadingDepartments = true;
    if (this.lableForm === 0 && this.DepartmentForm.invalid) {
      return
    } else {
      this.submit = true;
      this.lableForm === 0 ? this.AddDepartment() : this.EditDepartmentById();
    }
  }
  get form() {
    return this.DepartmentForm.controls;
  }
}
