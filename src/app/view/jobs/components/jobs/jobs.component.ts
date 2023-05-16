import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { DataJobs, Jobs, ShowJob } from '../../modal/jobs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import { JobsService } from '../../Services/jobs.service';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  JobForm: FormGroup;
  image: any;
  submit: boolean = false;
  allJobs: DataJobs[] = [];
  lableForm: number = 0;
  jobID: number = 0;
  loadingStatus: boolean = false;
  loadingJobs: boolean = false;
  loader: boolean = true;
  rangeValue: number = 0;
  loadingShow: boolean = false;
  departmentID: number = 0;
  constructor(
    private _formBuilder: FormBuilder,
    private _JobsService: JobsService,
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
    this.JobForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      nameInEnglish: [null, [Validators.required]],
      department_Id: this.departmentID
    });
    this.getJobs();
  }
  getJobs(): void {
    this._JobsService.getAllJobs(this.departmentID).subscribe({
      next: (res: Jobs) => {
        this.allJobs = res.data;
        this.loader = false;
      }
    })
  }
  // 0 : add
  // 1 : Edit
  openModal(content: any, num: number): void {
    this.lableForm = num;
    this.JobForm.reset();
    this.image = null;
    this.rangeValue = 0;
    this.modalService.open(content);
  }
  patchValueForm(content: any, Job: any) {
    this.lableForm = 1;
    this.showJob(Job.id);
    console.log(Job.id);
    
    this.jobID = Job.id;
    this.modalService.open(content);
  }
  
  showJob(jobID: number) {
    this.getUpdateJob(jobID)
    this.loadingShow = true;
    this._JobsService.getJobById(jobID).subscribe({
      next: (res: ShowJob) => {
        this.loadingShow = false;
        this.JobForm.patchValue({
          name: res.data.name,
          nameInEnglish: res.data.nameInEnglish,
          department_Id: res.data.department_Id,
        })
      }, error: (err: Error) => {
        this.loadingShow = false;
      }
    })
  }
  getUpdateJob(jobID: number): number {
    return jobID
  }
  EditJobById(): void {
    // this.JobForm.patchValue({
    //   department_Id: this.departmentID,
    // })
    let value = this.JobForm.value
    value['id'] = this.jobID;
    this._JobsService.EditJob(value).subscribe({
      next: (res: Jobs) => {
        this.getJobs();
        this.loadingJobs = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingJobs = false;
        this.toastrService.error(err.message);
      }
    })
  }
  AddJob(): void {
    this.JobForm.patchValue({
      department_Id: this.departmentID
    })
    let value = this.JobForm.value
    this._JobsService.addJob(value).subscribe({
      next: (res: Jobs) => {
        this.getJobs();
        this.loadingJobs = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingJobs = false;
        this.toastrService.error(err.message);
      }
    })
  }

  ChangeActiveOrNotJob(JobId: number) {
    this._JobsService.ChangeActiveOrNotJob(JobId).subscribe({
      next: (res: Jobs) => {
        this.getJobs();
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
  delete(JobId: number) {
    this._JobsService.RemoveJob(JobId).subscribe({
      next: (res: Jobs) => {
        this.getJobs();
        this.toastrService.error(res.message);
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
      }
    })
  }
  onSubmit() {
    this.loadingJobs = true;
    if (this.lableForm === 0 && this.JobForm.invalid) {
      return
    } else {
      this.submit = true;
      this.lableForm === 0 ? this.AddJob() : this.EditJobById();
    }
  }
  get form() {
    return this.JobForm.controls;
  }
}
