import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pagination } from 'app/core/modal/modal';
import { AllClientsComments, Clients, DataClients, DataListOfClientJobs, DataShowClientsComments, DatashowClient, ListOfClientJobs, showClient } from '../../modal/clients';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CountriesService } from 'app/pages/countries/countries.service';
import { Location } from '@angular/common';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { DepartmentsService } from 'app/view/departments/services/departments.service';
import { AuthenticationService } from 'app/core/services/auth.service';
import { EmployeesService } from 'app/view/employees/services/employees.service';
import { Employees } from 'app/view/employees/modal/employees';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  ListOfClientJobs: DataListOfClientJobs[];
  ListOfClientJobCategories: DataListOfClientJobs[];
  classificationID: number = 0;
  clientsData: DataClients[] = [];
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
  clientDetails: DatashowClient;
  currentUser: any;
  listOfDepartment: any[] = [];
  loaderComments: boolean = false;
  allClientComments: DataShowClientsComments[] = [];
  client_Id: number = 0;
  companyID: number = 0;
  clientCommunicationWay_Id: number = 0;
  listOfClientCommunicationWays: DataListOfClientJobs[];
  listOfStates: any[] = [];
  listOfRegion: any[] = [];
  state_Id: number = 0;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ClientsService: ClientService,
    private _DepartmentsService: DepartmentsService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private _CountriesService: CountriesService,
    private _location: Location,
    public _AuthenticationService: AuthenticationService,
    private _EmployeesService: EmployeesService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('user_ERP'))
    this.companyID = this._ActivatedRoute.snapshot.params['companyID']
    this.clientsForm = this._formBuilder.group({
      companyName: [null, [Validators.required]],
      // nameInEnglish: [null, [Validators.required]],
      // company: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.pattern('[0-9]+')]],
      activity: [null],
      generalManagerName: [null],
      salesManagerName: [null],
      email: [null, [Validators.email]],
      // address: [null],
      clientJob_Id: [null],
      clientJobCategory_Id: [null],
      region_Id: [null],
      department_Id: [null],
      // clientCommunicationWay_Id:[null]
    });
  }

  ngOnInit(): void {
    this.getClients();
    this.getListOfClientJobCategories();
    this.getListOfStates();
    // this.clientsForm.controls.clientJobCategory_Id.valueChanges.subscribe(val => {
    //   this.getListOfClientJobs(val)
    // })
  }
  getClients(): void {
    this._ClientsService.getClients(this.currentUser.department_Id).subscribe({
      next: (res: Clients) => {
        this.clientsData = res.data;
        this.loader = false
        this.ListOfClientCommunicationWays();
        this.ListOfDepartment();
      }, error: (err: Error) => {
        this.loader = false;
      }
    })
  }

  ListOfDepartment(): void {
    this._DepartmentsService.ListOfDepartment(this.companyID).subscribe({
      next: (res: Clients) => {
        this.listOfDepartment = res.data;
      }
    })
  }
  ListOfClientCommunicationWays(): void {
    this._ClientsService.ListOfClientCommunicationWays().subscribe({
      next: (res: ListOfClientJobs) => {
        this.listOfClientCommunicationWays = res.data;
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
    this.state_Id = 0
  }
  patchValueForm(content: any, Clients: any) {
    this.client_Id = Clients.id;
    this.lableForm = 1;
    this.showClients(Clients.id);
    this.modalService.open(content, { size: 'lg' });
  }
  viewClientDetails(content: any, clientId: number) {
    this.client_Id = clientId;
    this.showClients(clientId);
    this.modalService.open(content, { size: 'lg' });
    this.GetAllClientsComments()
  }
  showClients(clientId: number) {
    this.loadingShow = true;
    this._ClientsService.getclientById(clientId).subscribe({
      next: (res: showClient) => {
        this.state_Id = res.data.state_Id;
        this.getListOfRegions(this.state_Id);
        this.loadingShow = false;
        this.clientDetails = res.data;
        this.getListOfClientJobs(res.data.clientJobCategory_Id);
        this.clientsForm.patchValue({
          companyName: res.data.companyName,
          mobile: res.data.mobile,
          activity: res.data.activity,
          generalManagerName: res.data.generalManagerName,
          salesManagerName: res.data.salesManagerName,
          email: res.data.email,
          clientJob_Id: res.data.clientJob_Id,
          clientJobCategory_Id: res.data.clientJobCategory_Id,
          region_Id: res.data.region_Id,
          department_Id: res.data.department_Id,
        })

        this.clientCommunicationWay_Id = res.data.clientCommunicationWay_Id
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
  getListOfStates(): void {
    this._EmployeesService.ListOfStates().subscribe({
      next: (res: Employees) => {
        this.listOfStates = res.data;
      }
    })
  }
  getListOfRegions(stateID: number): void {
    console.log(stateID);
    stateID ?
      this._EmployeesService.ListOfRegions(stateID).subscribe({
        next: (res: Employees) => {
          this.listOfRegion = res.data;
        }
      }) : this.listOfRegion = [];
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
        this.toastrService.success(err.message);
      }
    })
  }
  EditClientCommunicationWay( clientCommunicationWay_Id: number) {
    let value = {};
    
    value['id'] = this.client_Id,
    value['clientCommunicationWay_Id'] = clientCommunicationWay_Id
    console.log(value);
    this._ClientsService.EditClientCommunicationWay(value).subscribe({
      next: (res: Clients) => {
        this.getClients();
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
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
        this.toastrService.error(err.message);
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
  GetAllClientsComments() {
    this._ClientsService.GetAllClientsComments(this.client_Id).subscribe({
      next: (res: AllClientsComments) => {
        this.loaderComments = false;
        this.allClientComments = res.data
      }
    })
  }
}
