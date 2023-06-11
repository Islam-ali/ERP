import { Component, Input, OnInit , Output ,EventEmitter} from '@angular/core';
import { DataShowClientsComments } from '../../modal/clients';
import { environment as env } from '@env/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-comments-client',
  templateUrl: './comments-client.component.html',
  styleUrls: ['./comments-client.component.scss']
})
export class CommentsClientComponent implements OnInit {
  @Input() Data: DataShowClientsComments[] = [];
  @Input() client_Id:number;
  @Output() reloadeClientComments:EventEmitter<any> = new EventEmitter();
  url: string = env.url;
  formComment: FormGroup;
  constructor(
    private _FormBuilder: FormBuilder,
    private _ClientsService: ClientService,
    ) {
    this.formComment = this._FormBuilder.group({
      text: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
  }
  onSubmit() {
    let value = this.formComment.value
    value['client_Id'] = this.client_Id
    this._ClientsService.AddClientComment(value).subscribe({
      next: (res: any) => {
        this.formComment.reset();
        this.reloadeClientComments.emit()
      }
    })
  }
}

