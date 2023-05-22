import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() Data:any[]=[];
  @Input() taskID:number = 0;
  comment:string = ''
  formComment:FormGroup;
  constructor(private _FormBuilder:FormBuilder , private _TasksService:TasksService) { }

  ngOnInit(): void {
    this.formComment = this._FormBuilder.group({
      text:[null,[Validators.required]],
      // task_Id:[null,[Validators.required]],
    })
  }

  onSubmit(){
    let value = this.formComment.value
    value['task_Id'] = this.taskID
    this._TasksService.AddTaskComment(value).subscribe({
      next:(res:any)=>{
        console.log(res);
        
      }
    })
  }
}
