import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormateDateService } from 'app/shared/services/formate-date.service';
import { DailyTasksService } from 'app/view/profile/services/daily-tasks.service';
import { EMPTY } from 'rxjs';
import { environment as env } from '@env/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-daily-tasks',
  templateUrl: './daily-tasks.component.html',
  styleUrls: ['./daily-tasks.component.scss']
})
export class DailyTasksComponent implements OnInit {
  DailyTasksForm: FormGroup;
  filterDailyTasksForm: FormGroup;
  allDailyTasks: any[] = [];
  files: any[] = [];
  uploadedFiles: any[] = [];
  filter: any = {};
  url: string = env.url;
  filesTasks: any[] = [];
  constructor(
    private _DailyTasksService: DailyTasksService,
    private _formBuilder: FormBuilder,
    private _FormateDateService: FormateDateService,
    private modalService: NgbModal,

  ) { }
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
  viewFiles(content:any , event:any[]){
    console.log(event);
    this.modalService.open(content ,{size:'lg'})
    this.filesTasks = event
  }
  removeImage(index: number) {
    this.uploadedFiles.splice(index, 1)
    this.files.splice(index, 1)
  }
  ngOnInit(): void {
    this.DailyTasksForm = this._formBuilder.group({
      description: [null, [Validators.required]]
    })
    this.filterDailyTasksForm = this._formBuilder.group({
      Description: [null],
      StartDate: [null],
      EndDate: [null],
    })
    this.GetAllDailyTasks();
  }
  filterDailyTasks() {
    this.filter = this.filterDailyTasksForm.value
    this.filter['StartDate'] = this.filterDailyTasksForm.get('StartDate').value ? this._FormateDateService.sendFormateDate(this.filterDailyTasksForm.get('StartDate').value) : null;
    this.filter['EndDate'] = this.filterDailyTasksForm.get('EndDate').value ? this._FormateDateService.sendFormateDate(this.filterDailyTasksForm.get('EndDate').value) : null;
    this.GetAllDailyTasks();
  }
  AddDailyTask(): void {
    const value = this.DailyTasksForm.value;
    value['Files'] = this.uploadedFiles
    this._DailyTasksService.AddDailyTask(value).subscribe({
      next: (res: any) => {
        this.DailyTasksForm.reset();
        this.GetAllDailyTasks();
        this.uploadedFiles = [];
        this.files = [];
      }
    })
  }
  GetAllDailyTasks(): void {
    this._DailyTasksService.GetAllDailyTasks(this.filter).subscribe({
      next: (res: any) => {
        this.allDailyTasks = res.data
      }
    })
  }

}
