import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DailyTasksService } from 'app/view/profile/services/daily-tasks.service';

@Component({
  selector: 'app-daily-tasks',
  templateUrl: './daily-tasks.component.html',
  styleUrls: ['./daily-tasks.component.scss']
})
export class DailyTasksComponent implements OnInit {
  DailyTasksForm: FormGroup;
  allDailyTasks:any[] = [];

  constructor(
    private _DailyTasksService:DailyTasksService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.DailyTasksForm = this._formBuilder.group({
      description:[null , [Validators.required]]
    })
    this.GetAllDailyTasks();
  }
  AddDailyTask():void{
    this._DailyTasksService.AddDailyTask(this.DailyTasksForm.value).subscribe({
      next:(res:any)=>{
        this.DailyTasksForm.reset();
        this.GetAllDailyTasks();
      }
    })
  }
  GetAllDailyTasks():void{
    this._DailyTasksService.GetAllDailyTasks().subscribe({
      next:(res:any)=>{
        this.allDailyTasks = res.data
      }
    })
  }

}
