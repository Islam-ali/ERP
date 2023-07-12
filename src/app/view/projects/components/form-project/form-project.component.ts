import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataProjects, Projects, ShowProjects } from '../../modal/projects';
import { ProjectsService } from '../../services/projects.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormateDateService } from 'app/shared/services/formate-date.service';
import { DepartmentsService } from 'app/view/departments/services/departments.service';
import { AuthenticationService } from 'app/core/services/auth.service';
import { Employees } from 'app/view/employees/modal/employees';
import { EMPTY } from 'rxjs';
import { Clients } from 'app/view/clients/modal/clients';
import { ClientService } from 'app/view/clients/services/client.service';

import { environment as env } from '@env/environment';
@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.scss']
})
export class FormProjectComponent implements OnInit {
  pathUrl: string = env.url;
  ListOfId: any[] = [];
  listOfDepartment: any[] = [];
  ProjectForm: FormGroup;
  image: any;
  submit: boolean = false;
  allProjects: DataProjects[] = [];
  lableForm: number = 0;
  ProjectId: number = 0;
  loadingStatus: boolean = false;
  loadingProjects: boolean = false;
  loader: boolean = true;
  rangeValue: number = 0;
  loadingShow: boolean = false;
  companyID: number = 0;
  currentUser: any;
  ListOfClients: any[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _ProjectsService: ProjectsService,
    private toastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _FormateDateService: FormateDateService,
    private _DepartmentsService: DepartmentsService,
    public _AuthenticationService: AuthenticationService,
    private _ClientsService: ClientService,
    private _Router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('user_ERP'))

    this._ActivatedRoute.paramMap.subscribe((param: any) => {
      this.companyID = +param.params['companyID'];
      this.ProjectId = +param.params['ProjectID'];
      this.getListOfDepartment();
      this.getListOfClients();
    })
    // this.departmentID = +this._ActivatedRoute.snapshot.params['departmentID'];
  }
  uploadeFiles(event: any, index: number): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.ProjectAttachments.controls[index].patchValue({
        File: event.target.files[0]
      })
      reader.onload = (event: any) => {
        this.ProjectAttachments.controls[index].patchValue({
          path: event.target.result
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  initformProjectAttachments(): FormGroup {
    return this._formBuilder.group({
      Description: [null, [Validators.required]],
      File: [null],
      path: null,
      id: 0
    })
  }
  get ProjectAttachments() {
    return this.ProjectForm.controls["ProjectAttachments"] as FormArray;
  }
  addformProjectAttachments() {
    this.ProjectAttachments.push(this.initformProjectAttachments());
  }
  deleteformProjectAttachments(index: number) {
    this.ProjectAttachments.removeAt(index);
  }
  ngOnInit(): void {
    this.ProjectId ? this.showProject(this.ProjectId) : EMPTY;
    this.ProjectForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      nameInEnglish: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      department_Id: [null],
      Budget: [null, Validators.pattern('[0-9]+')],
      Description: [null],
      ImplementationPeriod: [null],
      Client_Id: [null],
      ProjectAttachments: this._formBuilder.array([]),
    });
  }
  getListOfClients(): void {
    const value = {};
    value['CompanyId'] = this.companyID;
    value['DepartmentId'] = this.currentUser.department_Id;

    this._ClientsService.ListOfClients(value).subscribe({
      next: (res: any) => {
        this.ListOfClients = res.data
      }, error: (err: Error) => {
        this.loader = false;
      }
    })
  }
  getListOfDepartment(): void {
    this._DepartmentsService.ListOfDepartment(this.companyID).subscribe({
      next: (res: Employees) => {
        this.listOfDepartment = res.data;
      }
    })
  }
  showProject(ProjectID: number) {

    this.loadingShow = true;
    this._ProjectsService.getProjectById(ProjectID).subscribe({
      next: (res: ShowProjects) => {
        this.loadingShow = false;
        this.ProjectForm.patchValue({
          name: res.data.name,
          nameInEnglish: res.data.nameInEnglish,
          department_Id: res.data.department_Id,
          startDate: this._FormateDateService.recivedFormateDate(res.data.startDate),
          endDate: this._FormateDateService.recivedFormateDate(res.data.endDate),
          Budget: res.data.budget,
          Description: res.data.description,
          ImplementationPeriod: res.data.implementationPeriod,
          Client_Id: res.data.client_Id,
        })
        res.data.atachments.forEach((ele: any, index: number) => {
          this.addformProjectAttachments();
          this.ProjectAttachments.controls[index].patchValue({
            path: `${this.pathUrl + ele.file}`,
            Description: ele.description,
            id: ele.id,
          })
        })
      }, error: (err: Error) => {
        this.loadingShow = false;
      }
    })
  }
  RemoveImage(id: number) {
    this.ListOfId.push(id)
    this.DeleteFileOrMoreOfEmployee();
  }
  DeleteFileOrMoreOfEmployee() {
    this._ProjectsService.DeleteFileOrMoreOfProject(this.ListOfId).subscribe({
      next: (res: Projects) => {
        this.ListOfId = [];
        this.toastrService.error(res.message);
        this.ProjectForm.reset();
        this.showProject(this.ProjectId);
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
      }
    })
  }
  EditProjectById(): void {
    this.ProjectForm.patchValue({
      // department_Id: this.departmentID ? this.departmentID : this.ProjectForm.get('department_Id').value,
      startDate: this._FormateDateService.sendFormateDate(this.ProjectForm.get('startDate').value),
      endDate: this._FormateDateService.sendFormateDate(this.ProjectForm.get('endDate').value),
    })
    let value = this.ProjectForm.value
    value['id'] = this.ProjectId;
    value['ProjectAttachments'] = value.ProjectAttachments.map((x: any) => {
      const container = {};
      container['Description'] = x.Description
      container['File'] = x.File
      container['id'] = x.id
      return container;
    })
    console.log(value);
    
    this._ProjectsService.EditProject(value).subscribe({
      next: (res: Projects) => {
        this.loadingProjects = false;
        this.toastrService.success(res.message);
        this._Router.navigate(['/companies', this.companyID, 'projects'])
      }, error: (err: Error) => {
        this.loadingProjects = false;
        this.toastrService.error(`${err}`);

      }
    })
  }
  AddProject(): void {
    this.ProjectForm.patchValue({
      // department_Id: this.departmentID ? this.departmentID : this.ProjectForm.get('department_Id').value,
      startDate: this._FormateDateService.sendFormateDate(this.ProjectForm.get('startDate').value),
      endDate: this._FormateDateService.sendFormateDate(this.ProjectForm.get('endDate').value),
    })
    let value = this.ProjectForm.value
    value['ProjectAttachments'] = value.ProjectAttachments.map((x: any) => {
      const container = {};
      container['Description'] = x.Description
      container['File'] = x.File
      container['id'] = x.id
      return container;
    })
    this._ProjectsService.addProject(value).subscribe({
      next: (res: Projects) => {
        this.loadingProjects = false;
        this.toastrService.success(res.message);
        this._Router.navigate(['/companies', this.companyID, 'projects'])
      }, error: (err: Error) => {
        this.loadingProjects = false;
        this.toastrService.error(`${err}`);
      }
    })
  }
  onSubmit() {
    this.loadingProjects = true;
    if (!this.ProjectId && this.ProjectForm.invalid) {
      return
    } else {
      this.submit = true;
      !this.ProjectId ? this.AddProject() : this.EditProjectById();
    }
  }
  get form() {
    return this.ProjectForm.controls;
  }
}
