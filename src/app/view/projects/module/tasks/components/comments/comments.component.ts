import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { environment as env } from '@env/environment';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() Data:any[]=[];
  @Input() taskID:number = 0;
  @Output() reloadeComment:EventEmitter<any> = new EventEmitter(); 
  comment:string = ''
  formComment:FormGroup;
  constructor(private _FormBuilder:FormBuilder , private _TasksService:TasksService) { }

  ngOnInit(): void {
    this.formComment = this._FormBuilder.group({
      text:[null,[Validators.required]],
      // task_Id:[null,[Validators.required]],
    })
  }
  connectionSignalR(){
    const connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl(env.domain + 'notify', {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .build();

  connection
    .start()
    .then(() => {
      console.log('SignalR Connected!');
    })
    .catch((err) => {
      return console.log('err.toString()', err.toString());
    });

  connection.on('BroadcastMessage', () => {
    // this.getTracksOfVehicle();
    this.reloadeComment.emit(this.taskID)
    // this.getCoordinatesOfTrackInfoByVehicleId(this.id , this.newData[0].routeNumber , this.newData[0].districtId );
  });
  }
  onSubmit(){
    let value = this.formComment.value
    value['task_Id'] = this.taskID
    this._TasksService.AddTaskComment(value).subscribe({
      next:(res:any)=>{
        this.formComment.reset();
        this.reloadeComment.emit(this.taskID)
      }
    })
  }
  mention(event:any){
    if (event.key == '@') {
      
    }
    
  }
}
