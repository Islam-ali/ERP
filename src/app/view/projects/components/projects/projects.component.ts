import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { DataProjects, Projects, ShowProjects } from '../../modal/projects';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { FormateDateService } from 'app/shared/services/formate-date.service';
import { AuthenticationService } from 'app/core/services/auth.service';
import { DepartmentsService } from 'app/view/departments/services/departments.service';
import { Employees } from 'app/view/employees/modal/employees';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  listOfDepartment:any[]=[];
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
  // departmentID: number = 0;
  companyID: number = 0;
  constructor(
    private _formBuilder: FormBuilder,
    private _ProjectsService: ProjectsService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _location: Location,
    private _FormateDateService:FormateDateService,
    private _DepartmentsService:DepartmentsService,
    public _AuthenticationService : AuthenticationService,


  ) {
    this._ActivatedRoute.paramMap.subscribe((param:any)=>{
      this.companyID = +param.params['companyID'];
      this.getProjects();
      this.getListOfDepartment();
    })
    // this.departmentID = +this._ActivatedRoute.snapshot.params['departmentID'];
  }
  goBack() {
    this._location.back();
  }
  ngOnInit(): void {
    this.ProjectForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      nameInEnglish: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      department_Id: [null]
    });
  }
  getProjects(): void {
    this._ProjectsService.getAllProjects(this.companyID).subscribe({
      next: (res: Projects) => {
        this.allProjects = res.data;
        this.loader = false;
      }
    })
  }
  uploadeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.image = event.target.files.item(0)
      reader.onload = (event: any) => {
        this.ProjectForm.patchValue({
          image: event.target.result
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  getListOfDepartment(): void {
    this._DepartmentsService.ListOfDepartment(this.companyID).subscribe({
      next: (res: Employees) => {
        this.listOfDepartment = res.data;
      }
    })
  }
  // 0 : add
  // 1 : Edit
  openModal(content: any, num: number): void {
    this.lableForm = num;
    this.ProjectForm.reset();
    this.image = null;
    this.rangeValue = 0;
    // num == 1 ? this.patchValueForm() : EMPTY
    this.modalService.open(content);
  }
  patchValueForm(content: any, project: any) {
    this.lableForm = 1;
    this.showProject(project.id);
    console.log(project.id);
    
    this.ProjectId = project.id;
    this.modalService.open(content);
  }
  
  // formateDate(date){
  //   let arrayDate = date.split('-');
  //   const objdate = {year:+arrayDate[0],month:+arrayDate[1],day:+arrayDate[2]}
  //   return objdate
  // }// {year: 2023, month: 5, day: 13}
  // addFormateDate(date){
  //   console.log(date);
  //   var formatedate:any = {}
  //   if(date.month.toString().length == 1){
  //     formatedate = date.year+'-0'+date.month+'-'+date.day
  //   }else{
  //     formatedate = date.year+'-'+date.month+'-'+date.day
  //     console.log(formatedate);
  //   }
    
  //   return formatedate
  // }// 2000-01-01
  showProject(ProjectID: number) {
    this.getUpdateProject(ProjectID)
    this.loadingShow = true;
    this._ProjectsService.getProjectById(ProjectID).subscribe({
      next: (res: ShowProjects) => {
        this.loadingShow = false;
        this.ProjectForm.patchValue({
          name: res.data.name,
          nameInEnglish: res.data.nameInEnglish,
          department_Id: res.data.department_Id,
          startDate:  this._FormateDateService.recivedFormateDate(res.data.startDate) ,
          endDate: this._FormateDateService.recivedFormateDate(res.data.endDate),
        })
      }, error: (err: Error) => {
        this.loadingShow = false;
      }
    })
  }
  getUpdateProject(ProjectId: number): number {
    return ProjectId
  }
  EditProjectById(): void {
    this.ProjectForm.patchValue({
      // department_Id: this.departmentID ? this.departmentID : this.ProjectForm.get('department_Id').value,
      startDate: this._FormateDateService.sendFormateDate(this.ProjectForm.get('startDate').value),
      endDate: this._FormateDateService.sendFormateDate(this.ProjectForm.get('endDate').value),
    })
    let value = this.ProjectForm.value
    value['id'] = this.ProjectId;
    this._ProjectsService.EditProject(value).subscribe({
      next: (res: Projects) => {
        this.getProjects();
        this.loadingProjects = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);
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
    this._ProjectsService.addProject(value).subscribe({
      next: (res: Projects) => {
        this.getProjects();
        this.loadingProjects = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingProjects = false;
                this.toastrService.error(`${err}`);

      }
    })
  }

  ChangeActiveOrNotProject(ProjectId: number) {
    this._ProjectsService.ChangeActiveOrNotProject(ProjectId).subscribe({
      next: (res: Projects) => {
        this.getProjects();
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
  delete(ProjectId: number) {
    this._ProjectsService.RemoveProject(ProjectId).subscribe({
      next: (res: Projects) => {
        this.getProjects();
        this.toastrService.error(res.message);
      }, error: (err: Error) => {
                this.toastrService.error(`${err}`);

      }
    })
  }
  onSubmit() {
    this.loadingProjects = true;
    if (this.lableForm === 0 && this.ProjectForm.invalid) {
      return
    } else {
      this.submit = true;
      this.lableForm === 0 ? this.AddProject() : this.EditProjectById();
    }
  }
  get form() {
    return this.ProjectForm.controls;
  }

}
