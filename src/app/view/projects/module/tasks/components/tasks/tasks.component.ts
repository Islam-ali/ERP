import { Component, OnInit, ViewChild } from '@angular/core';
import { tasks } from 'app/pages/tasks/kanbanboard/data';
import { DndDropEvent } from 'ngx-drag-drop';
import { environment as env } from '@env/environment';

// import { tasks } from './data';

import { Task } from 'app/pages/tasks/kanbanboard/kanabn.model';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataListOfTaskStages, DataTasks, ListOfTaskStages, ShowTask, Tasks } from '../../modal/tasks';
import { FormateDateService } from 'app/shared/services/formate-date.service';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  imageConfig: DropzoneConfigInterface = {
    paramName: "Files",
    maxFilesize: 10000, // MB
    acceptedFiles: "image/*",
    clickable: true,
    url: "http://192.168.0.131:44385/api/Tasks/EditTask/1",
    uploadMultiple: true,
    addRemoveLinks: true
  };

  onUploadError(args: any): void {
    console.log("onUploadError:", args);
  }

  onUploadSuccess(args: any): void {
    console.log("onUploadSuccess:", args);
  }
  lableForm:number = 0;
  loadingSubmit:boolean = false;
  submit:boolean = false;
  domain: string = env.url;
  projectID: number = 0;
  departmentID: number = 0;
  ListOfTaskStages: DataListOfTaskStages[];
  loader: boolean = true;
  allTasks: DataTasks[];
  toDoTasks: DataTasks[] = [];
  inprogressTasks: DataTasks[] = [];
  inReviewTasks: DataTasks[] = []
  doneTasks: DataTasks[] = [];
  ListOfPriorities:any[] = [];
  taskForm: FormGroup;
  loadingTasks: boolean = false;
  loadingShow: boolean = false;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  ListOfEmployees:any[]=[];
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _TasksService: TasksService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastrService: ToastrService,
  ) { }
  initTaskForm(): FormGroup {
    return this._formBuilder.group({
      Title: [null, [Validators.required]],
      Description: [null],
      StartDate: [null],
      EndDate: [null],
      Project_Id: [this.projectID],
      Priority_Id: [null],
      AssignedEmployeeIds: [null],
      Files: [null],
      TaskStage_Id:[null],
      Id:null
    })
  }
  ngOnInit() {
    this.taskForm = this.initTaskForm();
    this.projectID = +this._ActivatedRoute.snapshot.params['projectID'];
    this.departmentID = +this._ActivatedRoute.snapshot.params['departmentID'];

    this.getAllTasks();
    this.getListOfTaskStages();
    this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Tasks', active: true }];
  }

  getAllTasks() {
    this._TasksService.getAllTasks(this.projectID).subscribe({
      next: (res: Tasks) => {
        this.allTasks = res.data;
        this._fetchData();
        this.loader = false;
      }
    })
  }
  addTask() {
    this.taskForm.patchValue({
      Project_Id: this.projectID,
    })
    let value = this.taskForm.value
    this._TasksService.addTask(value).subscribe({
      next: (res: Tasks) => {
        this.getAllTasks();
        this.loadingTasks = false;
        this.modalService.dismissAll();
        this.taskForm.reset();
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingTasks = false;
        this.toastrService.error(err.message);
      }
    })
  }
  EditTask() {
    let value = this.taskForm.value
    this._TasksService.EditTask(value).subscribe({
      next: (res: Tasks) => {
        this.getAllTasks();
        this.loadingTasks = false;
        this.modalService.dismissAll();
        this.taskForm.reset();
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingTasks = false;
        this.toastrService.error(err.message);
      }
    })
  }
  getTaskById(taskID: number) {
    this.loadingShow = true;
    this._TasksService.getTaskById(taskID).subscribe({
      next: (res: ShowTask ) => {
        this.loadingShow = false;
        this.taskForm.patchValue({
          Title: res.data.title,
          Description: res.data.description,
          Project_Id: res.data.project_Id,
          Priority_Id: res.data.priority_Id,
          AssignedEmployeeIds: res.data.assignedEmployeeIds,
          Files: res.data.files,
          StartDate: res.data.startDate,
          EndDate: res.data.endDate,
          Id:res.data.id
        })
      }, error: (err: Error) => {
        this.loadingShow = false;
      }
    })
  }
  ChangeActiveOrNotTask() {

  }
  RemoveTask(taskID:number) {
    this._TasksService.RemoveTask(taskID).subscribe({
      next: (res: Tasks) => {
        this.getAllTasks();
        this.toastrService.error(res.message);
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
      }
    })
  }
  getListOfPriorities() {
    this._TasksService.ListOfPriorities().subscribe({
      next: (res: any) => {
        this.ListOfPriorities = res.data;
      }
    })
  }
  getListOfTasks() {

  }
  getListOfTaskStages() {
    this._TasksService.ListOfTaskStages().subscribe({
      next: (res: ListOfTaskStages) => {
        this.ListOfTaskStages = res.data;
      }
    })
  }
  getListOfEmployees() {
    this._TasksService.ListOfEmployees(this.departmentID).subscribe({
      next: (res: any) => {
        this.ListOfEmployees = res.data;
      }
    })
  }
  /**
   * on dragging task
   * @param item item dragged
   * @param list list from item dragged
   */
  onDragged(item: any, list: any[]) {
    const index = list.indexOf(item);
    list.splice(index, 1);
  }

  /**
   * On task drop event
   */
  onDrop(event: DndDropEvent, filteredList?: any[], targetStatus?: number) {
    const value = {};
    if (filteredList && event.dropEffect === 'move') {
      let index = event.index;
      if(event.data.taskStage_Id !== targetStatus){
        this.EditTaskProgressing({Id:event.data.id ,TaskStage_Id:targetStatus });
      }
      if (typeof index === 'undefined') {
        index = filteredList.length;
      }
      filteredList.splice(index, 0, event.data);
    }
  }
  EditTaskProgressing(value:any = {}){
    this._TasksService.EditTaskProgressing(value).subscribe({
      next: (res: any) => {
        this.getAllTasks();
      }
    })
  }
  private _fetchData() {
    this.toDoTasks = this.allTasks.filter(t => t.taskStage_Id === 1);
    this.inprogressTasks = this.allTasks.filter(t => t.taskStage_Id === 2);
    this.inReviewTasks = this.allTasks.filter(t => t.taskStage_Id === 3);
    this.doneTasks = this.allTasks.filter(t => t.taskStage_Id === 4);
  }
  openModal(content: any, num: number , TaskStage_Id:number): void {
    this.taskForm.reset();
    this.taskForm.patchValue({TaskStage_Id:TaskStage_Id});
    this.lableForm = num;
    this.modalService.open(content , {size:'xl'});
    this.getListOfPriorities();
    this.getListOfEmployees();
  }
  onSubmit() {
    this.loadingTasks = true;
    if (this.lableForm === 0 && this.taskForm.invalid) {
      return
    } else {
      this.submit = true;
      this.lableForm === 0 ? this.addTask() : this.EditTask();
    }
  }
  get form() {
    return this.taskForm.controls;
  }
  errorImage(path){

  }
}
