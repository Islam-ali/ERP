import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormateDateService } from 'app/shared/services/formate-date.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  requestForm:FormGroup;
  listOfDepartment:any[]=[];
  constructor(
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private _FormateDateService: FormateDateService,
  ) { 
    // this.filterOwnedTasksForm = this._formBuilder.group({
    //   StartDate: [null],
    //   EndDate: [null],
    // })
    this.requestForm = this._formBuilder.group({
      Reason: ['', [Validators.required]],
      Date: [null],
    })
  }

  ngOnInit(): void {
  }
  onRequest(){

  }
}
