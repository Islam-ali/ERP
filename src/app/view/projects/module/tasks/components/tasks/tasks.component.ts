import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { tasks } from 'app/pages/tasks/kanbanboard/data';
import { DndDropEvent } from 'ngx-drag-drop';
import { environment as env } from '@env/environment';
// import { tasks } from './data';
import * as signalR from '@microsoft/signalr';

import { Task } from 'app/pages/tasks/kanbanboard/kanabn.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Atachment, Comments, DataComments, DataListOfTaskStages, DataShowTask, DataTasks, ListOfTaskStages, ShowTask, Tasks } from '../../modal/tasks';
import { EMPTY } from 'rxjs';
import { AuthenticationService } from 'app/core/services/auth.service';
import { DepartmentsService } from 'app/view/departments/services/departments.service';
import { Employees } from 'app/view/employees/modal/employees';
import { SharedService } from 'app/shared/services/shared.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit , AfterViewInit {
  @ViewChild('viewTasks') viewTasksRef!: ElementRef;
  taskData: DataShowTask;
  allComments: DataComments[];
  // onUploadError(args: any): void {
  //   console.log("onUploadError:", args);
  // }

  // onUploadSuccess(args: any): void {
  //   console.log("onUploadSuccess:", args);
  // }
  ListOfId: number[] = [];
  lableForm: number = 0;
  loadingSubmit: boolean = false;
  loaderComments: boolean = true;
  submit: boolean = false;
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
  ListOfPriorities: any[] = [];
  taskForm: FormGroup;
  loadingTasks: boolean = false;
  loadingShow: boolean = false;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  ListOfEmployees: any[] = [];
  taskID: number = 0;
  companyID: number = 0;
  listOfDepartment: any[] = [];

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _TasksService: TasksService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    public _AuthenticationService: AuthenticationService,
    private _DepartmentsService: DepartmentsService,
    private router: Router,
    private _SharedService: SharedService
  ) {
    this._SharedService.RouteNotificatin$.subscribe(res=>{      
      this._ActivatedRoute.paramMap.subscribe((param: any) => {
        this.projectID = +param.params['projectID']
        this.companyID = +param.params['companyID'];
        this.taskForm = this.initTaskForm();
        this.getAllTasks();
        this.getListOfTaskStages();
      })
    })
  }
  ngAfterViewInit() {
    this._ActivatedRoute.queryParamMap.subscribe((param: any) => {
      this.taskID = +param.params['taskId'];
      param.params['taskId'] ? this.viewModalTask(this.viewTasksRef, 1, this.taskID) : EMPTY
    })
  }
  GetDepartmentIdByProjectId(){
    this._TasksService.GetDepartmentIdByProjectId(this.projectID).subscribe({
      next: (res: any) => {
        this.departmentID = +res.data
      }
    })
  }
  initTaskForm(): FormGroup {
    return this._formBuilder.group({
      Title: [null, [Validators.required]],
      Description: [null],
      StartDate: [null],
      EndDate: [null],
      Project_Id: [this.projectID],
      Priority_Id: [null],
      AssignedEmployeeIds: [null],
      TaskAtachments: this._formBuilder.array([]),
      TaskStage_Id: [null],
      Id: null,
      // department_Id:[null]
    })
  }
  uploadeFiles(event: any, index: number): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.TaskAtachments.controls[index].patchValue({
        File: event.target.files[0]
      })
      reader.onload = (event: any) => {
        this.TaskAtachments.controls[index].patchValue({
          path: event.target.result
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  initformTaskAtachments(): FormGroup {
    return this._formBuilder.group({
      Description: [null, [Validators.required]],
      File: [null],
      path: null,
      id: 0
    })
  }
  get TaskAtachments() {
    return this.taskForm.controls["TaskAtachments"] as FormArray;
  }
  addformTaskAtachments() {
    this.TaskAtachments.push(this.initformTaskAtachments());
  }
  deleteformTaskAtachments(index: number) {
    this.TaskAtachments.removeAt(index);
  }
  ngOnInit() {
    this.GetDepartmentIdByProjectId();
    // this.projectID = +this._ActivatedRoute.snapshot.params['projectID'];
    // this.departmentID = +this._ActivatedRoute.snapshot.params['departmentID'];
    this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Tasks', active: true }];
  }
  // getListOfDepartment(): void {
  //   this._DepartmentsService.ListOfDepartment(this.companyID).subscribe({
  //     next: (res: Employees) => {
  //       this.listOfDepartment = res.data;
  //     }
  //   })
  // }
  getAllTasks() {
    this._TasksService.getAllTasks(this.projectID).subscribe({
      next: (res: Tasks) => {
        this.allTasks = res.data;
        // this.allTasks.length > 0 ? this.departmentID = res.data[0].department_Id : this.departmentID = 0
        this.getListOfEmployees(this.departmentID);
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
    value['TaskAtachments'] = this.taskForm.value.TaskAtachments.map((x: any) => {
      const container = {};
      container['Description'] = x.Description
      container['File'] = x.File
      container['id'] = x.id
      return container;
    })
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
      next: (res: ShowTask) => {
        this.loadingShow = false;
        this.taskData = res.data
        // this.getListOfDepartment();
        this.taskForm.patchValue({
          Title: res.data.title,
          Description: res.data.description,
          Project_Id: res.data.project_Id,
          Priority_Id: res.data.priority_Id,
          AssignedEmployeeIds: res.data.assignedEmployeeData.map((x) => x.id),
          StartDate: res.data.startDate,
          EndDate: res.data.endDate,
          Id: res.data.id,
          TaskStage_Id: res.data.taskStage_Id,
          // department_Id:res.data.department_Id
        })
        // if(res.data.atachments.length > 0){
        //   this.addformTaskAtachments();
        // }
        this.TaskAtachments.clear();
        res.data.atachments.forEach((ele: Atachment, index) => {
          this.addformTaskAtachments()
          this.TaskAtachments.controls[index].patchValue({
            Description: ele.description,
            id: ele.id,
            path: this.domain + ele.file
          })
        })
      }, error: (err: Error) => {
        this.loadingShow = false;
      }
    })
  }
  RemoveTask(taskID: number) {
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
  RemoveImage(id: number) {
    this.ListOfId.push(id)
    this.DeleteFileOrMoreOfTasks();
  }
  DeleteFileOrMoreOfTasks() {
    this._TasksService.DeleteFileOrMoreOfTasks(this.ListOfId).subscribe({
      next: (res: Tasks) => {
        this.ListOfId = [];
        this.toastrService.error(res.message);
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
      }
    })
  }

  getListOfTaskStages() {
    this._TasksService.ListOfTaskStages().subscribe({
      next: (res: ListOfTaskStages) => {
        this.ListOfTaskStages = res.data;
      }
    })
  }
  getListOfEmployees(departmentID: number) {
    this._TasksService.ListOfEmployees(departmentID).subscribe({
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
      if (event.data.taskStage_Id !== targetStatus) {
        this.EditTaskProgressing({ Id: event.data.id, TaskStage_Id: targetStatus });
      }
      if (typeof index === 'undefined') {
        index = filteredList.length;
      }
      filteredList.splice(index, 0, event.data);
    }
  }
  EditTaskProgressing(value: any = {}) {
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
  openModal(content: any, num: number, TaskStage_Id: number): void {
    this.taskForm.reset();
    this.TaskAtachments.clear();
    // this.addformTaskAtachments();
    this.taskForm.patchValue({ TaskStage_Id: TaskStage_Id });
    this.lableForm = num;
    this.modalService.open(content, { size: 'xl' });
    this.getListOfPriorities();
    // this.getListOfEmployees();
  }
  viewModalTask(content: any, num: number, taskID: number): void {
    this.lableForm = num;
    this.getTaskById(taskID);
    this.GetAllTaskComments(taskID);
    this.taskID = taskID;
    this.modalService.open(content, { size: 'xl' });
  }
  editModal(content: any, num: number, taskID: number) {
    this.taskID = taskID;
    this.getTaskById(taskID);
    this.GetAllTaskComments(taskID);
    this.getListOfPriorities();
    this.lableForm = num;
    this.modalService.open(content, { size: 'xl' });
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
  GetAllTaskComments(taskID: number) {
    this._TasksService.GetAllTaskComments(taskID).subscribe({
      next: (res: Comments) => {
        this.loaderComments = false;
        this.allComments = res.data
      }
    })
  }
}
