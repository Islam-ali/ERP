import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataAllDepartments, Departments } from 'app/view/departments/modal/departments';
import { DepartmentsService } from 'app/view/departments/services/departments.service';
import { Projects } from 'app/view/projects/modal/projects';
import { TasksService } from 'app/view/projects/module/tasks/services/tasks.service';
import { ProjectsService } from 'app/view/projects/services/projects.service';
import { error } from 'console';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  companyID: number = 0;
  allProjects:any[]=[];
  allTasks:any[]=[];
  allDepartments: DataAllDepartments[] = [];
  loaderDepartments: boolean = true;
  loaderProjects: boolean = true;
  loaderTasks: boolean = true;
  
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
  constructor(
    private _DepartmentsService: DepartmentsService,
    private _ProjectsService:ProjectsService,
    private _TasksService:TasksService,
    private _ActivatedRoute:ActivatedRoute
  ) {
    this.companyID = this._ActivatedRoute.snapshot.params['companyId']
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getProjects();
    this.GetAllTasksByCompanyOrDepartmentId();
    
  }
  getDepartments(): void {
    this._DepartmentsService.getAllDepartments(this.companyID).subscribe({
      next: (res: Departments) => {
        this.allDepartments = res.data;
        this.loaderDepartments = false;
      }
    })
  }
  getProjects(): void {
    this._ProjectsService.GetAllProjectsByCompanyOrDepartmentId(this.companyID).subscribe({
      next: (res: any) => {
        this.allProjects = res.data;
        this.loaderProjects = false;
      }
    })
  }
  GetAllTasksByCompanyOrDepartmentId(): void {
    this._TasksService.GetAllTasksByCompanyOrDepartmentId(this.companyID).subscribe({
      next: (res: any) => {
        this.allTasks = res.data;
        this.loaderTasks = false;
      },error:(error:any)=>{
        this.loaderTasks = false
      }
    })
  }
}
