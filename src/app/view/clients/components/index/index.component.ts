import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pagination } from 'app/core/modal/modal';
import { Clients, DataClients, DataListOfClientJobs, ListOfClientJobs, showClient } from '../../modal/clients';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CountriesService } from 'app/pages/countries/countries.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  ListOfClientJobs: DataListOfClientJobs[];
  ListOfClientJobCategories: DataListOfClientJobs[];
  classificationID: number = 0;
  clientsData: DataClients[];
  pagination: Pagination;
  pageNumber: number = 1;
  clientsForm: FormGroup;
  submit: boolean = false;
  lableForm: number = 0;
  ClientsId: number = 0;
  loadingStatus: boolean = false;
  loadingclients: boolean = false;
  loader: boolean = true;
  rangeValue: number = 0;
  loadingShow: boolean = false;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ClientsService: ClientService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private _CountriesService: CountriesService,
    private _location: Location
  ) {
    this.clientsForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      nameInEnglish: [null, [Validators.required]],
      company: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.pattern('[0-9]+')]],
      activity: [null],
      generalManagerName: [null],
      salesManagerName: [null],
      email: [null, [Validators.email]],
      address: [null],
      clientJob_Id: [null],
      clientJobCategory_Id: [null]
    });
  }

  ngOnInit(): void {
    this.getClients();
    this.getListOfClientJobCategories();
    // this.clientsForm.controls.clientJobCategory_Id.valueChanges.subscribe(val => {
    //   this.getListOfClientJobs(val)
    // })
  }

  getClients(): void {
    this._ClientsService.getClients().subscribe({
      next: (res: Clients) => {
        this.clientsData = res.data;
        this.loader = false
      }
    })
  }
  getListOfClientJobs(event): void {
    this._ClientsService.ListOfClientJobs(event).subscribe({
      next: (res: ListOfClientJobs) => {
        this.ListOfClientJobs = res.data
      }
    })
  }
  getListOfClientJobCategories(): void {
    this._ClientsService.ListOfClientJobCategories().subscribe({
      next: (res: ListOfClientJobs) => {
        this.ListOfClientJobCategories = res.data
      }
    })
  }
  openModal(content: any, num: number): void {
    this.lableForm = num;
    this.clientsForm.reset();
    this.modalService.open(content, { size: 'lg' });
  }
  patchValueForm(content: any, Clients: any) {
    this.lableForm = 1;
    this.showClients(Clients.id)
    this.modalService.open(content, { size: 'lg' });
  }
  showClients(countryId: number) {
    this.loadingShow = true;
    this._ClientsService.getclientById(countryId).subscribe({
      next: (res: showClient) => {
        this.loadingShow = false;
        this.getListOfClientJobs(res.data.clientJobCategory_Id);
        this.clientsForm.patchValue({
          name: res.data.name,
          nameInEnglish: res.data.nameInEnglish,
          company: res.data.company,
          mobile: res.data.mobile,
          activity: res.data.activity,
          generalManagerName: res.data.generalManagerName,
          salesManagerName: res.data.salesManagerName,
          email: res.data.email,
          address: res.data.address,
          clientJob_Id: res.data.clientJob_Id,
          clientJobCategory_Id: res.data.clientJobCategory_Id
        })
      }, error: (err: Error) => {
        this.loadingShow = false;
      }
    })
  }
  getUpdateClients(ClientsId: number): number {
    this.ClientsId = ClientsId;
    return ClientsId
  }
  updateClients(): void {
    let value = this.clientsForm.value;
    value['id'] = this.ClientsId
    this._ClientsService.updateClients(value, this.ClientsId).subscribe({
      next: (res: Clients) => {
        this.getClients();
        this.loadingclients = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingclients = false;
        this.toastrService.error(err.message);
      }
    })
  }
  getAddClients(): void {
    let value = this.clientsForm.value
    this._ClientsService.addClient(value).subscribe({
      next: (res: Clients) => {
        this.getClients();
        this.loadingclients = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingclients = false;
        console.log(err);
        
      }
    })
  }
  ChangeActiveOrNotDepartment(ClientId: number) {
    this._ClientsService.ChangeActiveOrNotDepartment(ClientId).subscribe({
      next: (res: Clients) => {
        this.getClients();
        if (res.isActive) {
          this.toastrService.success(res.message);
        } else {
          this.toastrService.warning(res.message);
        }
      }, error: (err: Error) => {
        this.toastrService.error(`${err}`);
      }
    })
  }
  delete(ClientsId: number) {
    this._ClientsService.RemoveClient(ClientsId).subscribe({
      next: (res: Clients) => {
        this.getClients();
        this.toastrService.error(res.message);

      }, error: (err: Error) => {
        this.toastrService.error(err.message);
      }
    })
  }

  // 0 : add
  // 1 : Edit
  onSubmit() {
    this.loadingclients = true;
    this.lableForm === 0 ? this.getAddClients() : this.updateClients();
  }
  get form() {
    return this.clientsForm.controls;
  }
  goBack() {
    this._location.back();
  }
}
