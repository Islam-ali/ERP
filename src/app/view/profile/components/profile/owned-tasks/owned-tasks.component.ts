import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormateDateService } from 'app/shared/services/formate-date.service';
import { OwnedTasksService } from 'app/view/profile/services/owned-tasks.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { environment as env } from '@env/environment';
@Component({
  selector: 'app-owned-tasks',
  templateUrl: './owned-tasks.component.html',
  styleUrls: ['./owned-tasks.component.scss']
})
export class OwnedTasksComponent implements OnInit {
  @Input() allTasks: any[] = []
  @Input() totalRecords: number = 0;
  OwnedTasksForm: FormGroup;
  filterOwnedTasksForm: FormGroup;
  // allTasks: any[] = [];
  files: any[] = [];
  uploadedFiles: any[] = [];
  pageNumber: number = 1;
  loader: boolean = false;
  filter: any = {
    "pageNumber": 1,
    "PageSize": 10
  };
  url: string = env.url;
  filesTasks: any[] = [];
  // totalRecords:number = 0;
  constructor(
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private _OwnedTasksService: OwnedTasksService,
    private _FormateDateService: FormateDateService,
    private _location: Location,
  ) {
    this.filterOwnedTasksForm = this._formBuilder.group({
      StartDate: [null],
      EndDate: [null],
    })
    this.OwnedTasksForm = this._formBuilder.group({
      Name: ['', [Validators.required]],
      StartDate: [null],
      EndDate: [null],
      // Files: this._formBuilder.array([this.initFormOwnedTasks()]),
    })
  }
  goBack() {
    this._location.back();
  }
  viewFiles(content: any, event: any[]) {
    console.log(event);
    this.modalService.open(content, { size: 'lg' })
    this.filesTasks = event
  }
  // initFormOwnedTasks(): FormGroup {
  //   return this._formBuilder.group({
  //     File: [null],
  //     path: null
  //   })
  // }
  // get OwnedTasksArray() {
  //   return this.OwnedTasksForm.controls["Files"] as FormArray;
  // }
  // addFormOwnedTasks() {
  //   this.OwnedTasksArray.push(this.initFormOwnedTasks());
  // }
  // deleteFormOwnedTasks(index: number) {
  //   this.OwnedTasksArray.removeAt(index);
  // }
  onImageSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        this.uploadedFiles.push(event.target.files.item(i));
        reader.onload = (event: any) => {
          this.files.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  removeImage(index: number) {
    this.uploadedFiles.splice(index, 1)
    this.files.splice(index, 1)
  }
  ngOnInit(): void {
    this.GetAllOwnedTasks();
  }
  filterOwnedTasks() {
    this.filter = this.filterOwnedTasksForm.value
    this.filter['pageNumber'] = this.pageNumber;
    this.filter['StartDate'] = this._FormateDateService.sendFormateDate(this.filterOwnedTasksForm.get('StartDate').value);
    this.filter['EndDate'] = this._FormateDateService.sendFormateDate(this.filterOwnedTasksForm.get('EndDate').value);
    this.GetAllOwnedTasks();
  }
  addOwnedTask() {
    let value = this.OwnedTasksForm.value
    value['Name'] = value.Name
    value['StartDate'] = this._FormateDateService.sendFormateDate(this.OwnedTasksForm.get('StartDate').value);
    value['EndDate'] = this._FormateDateService.sendFormateDate(this.OwnedTasksForm.get('EndDate').value);
    value['Files'] = this.uploadedFiles

    this._OwnedTasksService.addOwnedTask(value).subscribe({
      next: (res: any) => {
        this.OwnedTasksForm.reset();
        this.files = [];
        this.uploadedFiles = [];
        this.toastrService.success(res.message);
        this.GetAllOwnedTasks();
      }, error: (err: Error) => {
        this.toastrService.warning(err.message)
      }
    })
  }
  ChangeActiveOrNotOwnedTask(id: number) {
    this._OwnedTasksService.ChangeActiveOrNotOwnedTask(id).subscribe({
      next: (res: any) => {
        !res.isActive ? this.toastrService.warning(res.message) : this.toastrService.success(res.message);
        this.GetAllOwnedTasks();
      }, error: (err: Error) => {
        this.toastrService.warning(err.message)
      }
    })
  }
  pagination(event: any) {
    this.pageNumber = event;
    this.filter['pageNumber'] = this.pageNumber;
    this.GetAllOwnedTasks();
  }
  GetAllOwnedTasks() {
    this.loader = true;
    this._OwnedTasksService.GetAllOwnedTasks(this.filter).subscribe({
      next: (res: any) => {
        this.allTasks = res.data.data;
        this.totalRecords = res.data.totalRecords;
        this.loader = false;
      }, error: (err: Error) => {
        this.loader = false;
      }
    })
  }
  RemoveTask(id: number) {
    this._OwnedTasksService.RemoveOwnedTask(id).subscribe({
      next: (res: any) => {
        this.toastrService.error(res.message)
        this.GetAllOwnedTasks();
      }, error: (err: Error) => {
        this.toastrService.error(err.message)
      }
    })
  }
}
