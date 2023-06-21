import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Input() client_Id: number;
  @Output() reloadeClientComments: EventEmitter<any> = new EventEmitter();
  url: string = env.url;
  formComment: FormGroup;
  files: any[] = [];
  uploadedFiles: any[] = [];
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
  onSubmit() {
    let value = this.formComment.value
    value['client_Id'] = this.client_Id;
    value['Files'] = this.uploadedFiles
    this._ClientsService.AddClientComment(value).subscribe({
      next: (res: any) => {
        this.uploadedFiles = [];
        this.files = [];
        this.formComment.reset();
        this.reloadeClientComments.emit();
      }
    })
  }
}

