import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { environment as env } from '@env/environment';
import * as signalR from '@microsoft/signalr';
import { EmployeesService } from 'app/view/employees/services/employees.service';
import { Observable } from 'rxjs';
import { Error } from 'app/core/helpers/error';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() Data: any[] = [];
  @Input() taskID: number = 0;
  @Input() departmentID: number = 0;
  @Output() reloadeComment: EventEmitter<any> = new EventEmitter();
  comment: string = ''
  formComment: FormGroup;
  ListOfEmployee: any[] = [];
  url: string = env.url;
  Text = ``;
  loading = false;
  choices: any[] = [];
  mentions: any[] = [];
  elementCreated: string = '';
  submit: boolean = false;
  constructor(
    private _FormBuilder: FormBuilder,
    private _TasksService: TasksService,
    private _EmployeesService: EmployeesService,
    private toastrService: ToastrService,
    private _AuthenticationService:AuthenticationService
  ) { }

  ngOnInit(): void {
    this.formComment = this._FormBuilder.group({
      Text: [null, [Validators.required]],
      // task_Id:[null,[Validators.required]],
    })
    this.loadChoices('');
    this.formComment.valueChanges.subscribe((res: any) => {
      this.submit = false
    })
  }
  // connectionSignalR() {
  //   const connection = new signalR.HubConnectionBuilder()
  //     .configureLogging(signalR.LogLevel.Information)
  //     .withUrl(env.domain + 'notify', {
  //       accessTokenFactory:() => `${this._AuthenticationService.getUser().token}`,
  //       skipNegotiation: true,
  //       transport: signalR.HttpTransportType.WebSockets,
  //     })
  //     .build();

  //   connection
  //     .start()
  //     .then(() => {
  //       console.log('SignalR Connected!');
  //     })
  //     .catch((err) => {
  //       return console.log('err.toString()', err.toString());
  //     });

  //   connection.on('BroadcastMessage', () => {
  //     // this.getTracksOfVehicle();
  //     this.reloadeComment.emit(this.taskID)
  //     // this.getCoordinatesOfTrackInfoByVehicleId(this.id , this.newData[0].routeNumber , this.newData[0].districtId );
  //   });
  // }
  onSubmit() {
    let value = this.formComment.value
    value['task_Id'] = this.taskID
    const formMention: any = {};
    this._TasksService.AddTaskComment(value).subscribe({
      next: (res: any) => {
        this.getUsers();
        formMention['taskId'] = this.taskID;
        formMention['employeesIds'] = this.mentions.map( x => x.choice.id)        
        if(this.mentions.length > 0){
          this.AddMentionedEmployees(formMention);
        }
        this.mentions = [];
        this.formComment.reset();
        this.submit = true;
        this.reloadeComment.emit(this.taskID)
      },error:(err:any)=>{
      }
    })
  }


  async loadChoices(searchTerm: string): Promise<any[]> {
    const users = await this.getUsers();
    this.submit = false;
    this.choices = this.ListOfEmployee.filter((user) => {
      const alreadyExists = this.mentions.some(
        (m) => m.choice.name === user.name
      );
      return (
        !alreadyExists &&
        user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
    return this.choices;
  }

  getChoiceLabel = (user: any): string => {
    return `@${user.name}`;
  };

  onSelectedChoicesChange(choices: any[]): void {
    this.mentions = choices;
  }
  async getUsers() {
    this.loading = true;
    this._EmployeesService.ListOfEmployeesForMentioned(this.departmentID).subscribe({
      next: (res: any) => {
        this.ListOfEmployee = res.data
      }
    })
  }
  AddMentionedEmployees(form: any = {}) {
    this._TasksService.AddMentionedEmployees(form).subscribe({
      next: (res: any) => {
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
      }
    })
  }
}
