import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { DataProjects, Projects, ShowProjects } from '../../modal/projects';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {


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
  departmentID: number = 0;
  constructor(
    private _formBuilder: FormBuilder,
    private _ProjectsService: ProjectsService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _location: Location
  ) {
    this.departmentID = +this._ActivatedRoute.snapshot.params['departmentID']
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
      department_Id: this.departmentID
    });
    this.getProjects();
  }
  getProjects(): void {
    this._ProjectsService.getAllProjects(this.departmentID).subscribe({
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
  
  formateDate(date){
    let arrayDate = date.split('-');
    const objdate = {year:+arrayDate[0],month:+arrayDate[1],day:+arrayDate[2]}
    return objdate
  }// {year: 2023, month: 5, day: 13}
  addFormateDate(date){
    console.log(date);
    var formatedate:any = {}
    if(date.month.toString().length == 1){
      formatedate = date.year+'-0'+date.month+'-'+date.day
    }else{
      formatedate = date.year+'-'+date.month+'-'+date.day
    }
    return formatedate
  }// 2000-01-01
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
          startDate:  this.formateDate(res.data.startDate) ,
          endDate: this.formateDate(res.data.endDate),
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
      department_Id: this.departmentID,
      startDate: this.addFormateDate(this.ProjectForm.get('startDate').value),
      endDate: this.addFormateDate(this.ProjectForm.get('endDate').value),
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
        this.toastrService.error(err.message);
      }
    })
  }
  AddProject(): void {
    this.ProjectForm.patchValue({
      department_Id: this.departmentID,
      startDate: this.addFormateDate(this.ProjectForm.get('startDate').value),
      endDate: this.addFormateDate(this.ProjectForm.get('endDate').value),
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
        this.toastrService.error(err.message);
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
        this.toastrService.error(err.message);
      }
    })
  }
  delete(ProjectId: number) {
    this._ProjectsService.RemoveProject(ProjectId).subscribe({
      next: (res: Projects) => {
        this.getProjects();
        this.toastrService.error(res.message);
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
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
