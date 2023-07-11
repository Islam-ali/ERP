import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pagination } from 'app/core/modal/modal';
import { AllClientsComments, Clients, DataClients, DataDataClients, DataListOfClientJobs, DataShowClientsComments, DatashowClient, ListOfClientJobs, showClient } from '../../modal/clients';
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
import { EMPTY } from 'rxjs';
import { environment as env } from '@env/environment';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit {
  url: string = env.url;
  @ViewChild('viewClient') viewClientRef!: ElementRef;
  ListOfClientJobs: DataListOfClientJobs[];
  ListOfClientJobCategories: DataListOfClientJobs[];
  classificationID: number = 0;
  clientsData: DataDataClients[] = [];
  pagination: Pagination;
  pageNumber: number = 1;
  clientsForm: FormGroup;
  clientCommunicationWayForm: FormGroup;
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
  listOfClientTypes: any[] = [];
  listOfLotsOfClientStatus:any[]=[];
  state_Id: number = 0;
  totalRecords: number = 0;
  pathImage: any;
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
    this._ActivatedRoute.paramMap.subscribe((param: any) => {
      this.loader = true;
      this.companyID = +param.params['companyID'];
      this.getClients();
    })
    this.clientCommunicationWayForm = this._formBuilder.group({
      id: [null],
      clientCommunicationWay_Id: [null],
      communicationWayDate: [null],
      communicationWayTime: [null],
    })
    this.clientsForm = this._formBuilder.group({
      companyName: [null, [Validators.required]],
      mobile: [null],
      addressInDetail: [null],
      activity: [null],
      generalManagerName: [null],
      salesManagerName: [null],
      email: [null, [Validators.email]],
      clientJob_Id: [null],
      clientJobCategory_Id: [null],
      region_Id: [null],
      department_Id: [null, [Validators.required]],
      image: [null],
      clientType_Id: [null, [Validators.required]]
    });
  }
  // getListOfStates(): void {
  //   this._EmployeesService.ListOfStates().subscribe({
  //     next: (res: Employees) => {
  //       this.listOfStates = res.data;
  //     }
  //   })
  // }
  ListOfLotsOfClientStatus(): void {
    this._ClientsService.ListOfLotsOfClientStatus().subscribe({
      next: (res: ListOfClientJobs) => {
        this.listOfLotsOfClientStatus = res.data;
      }
    })
  }
  changeStatus(clientStatus_Id:number,event:any){
    let value = {};
    value['id'] = clientStatus_Id
    value['clientStatus_Id'] = event.id

      this._ClientsService.EditClientStatus(value).subscribe({
        next: (res: Clients) => {
          this.getClients();
          this.showClients(event.id);
          this.GetAllClientsComments()      
          // this.loadingclients = false;
          // this.modalService.dismissAll();
          this.toastrService.success(res.message);
        }, error: (err: Error) => {
          // this.loadingclients = false;
          this.toastrService.error(err.message);
        }
  })
}
  uploadImg(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.clientsForm.patchValue({
        image: event.target.files.item(0)
      })
      reader.onload = (event: any) => {
        this.pathImage = event.target.result

      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  ngAfterViewInit() {
    this._ActivatedRoute.queryParamMap.subscribe((param: any) => {
      this.client_Id = +param.params['clientId'];
      param.params['clientId'] ? this.viewClientDetails(this.viewClientRef, this.client_Id) : EMPTY
    })
  }
  ngOnInit(): void {
    this.getClients();
    this.getListOfClientJobCategories();
    this.getListOfStates();
    this.ListOfClientTypes();
    this.ListOfLotsOfClientStatus();
    // this.clientsForm.controls.clientJobCategory_Id.valueChanges.subscribe(val => {
    //   this.getListOfClientJobs(val)
    // })
  }
  paginationClients(event: number) {
    this.pageNumber = event;
    this.getClients();
  }
  getClients(): void {
    const value = {};
    value['CompanyId'] = this.companyID;
    value['DepartmentId'] = this.currentUser.department_Id;
    value['CompanyName'] = '';
    value['ClientCommunicationWay_Id'] = '';
    value['PageSize'] = 10;
    value['PageNumber'] = this.pageNumber;

    this._ClientsService.getClients(value).subscribe({
      next: (res: Clients) => {
        this.clientsData = res.data.data;
        this.totalRecords = res.data.totalRecords
        this.loader = false;
        this.clientsForm.reset();
        this.pathImage = null;
        this.ListOfClientCommunicationWays();
        this.ListOfDepartment();
      }, error: (err: Error) => {
        this.loader = false;
      }
    })
  }

  ListOfDepartment(): void {
    this._DepartmentsService.ListOfDepartment(this.companyID).subscribe({
      next: (res: any) => {
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
        res.data.clientJobCategory_Id ? this.getListOfClientJobs(res.data.clientJobCategory_Id) : EMPTY;
        this.clientsForm.patchValue({
          companyName: res.data.companyName,
          mobile: res.data.mobile,
          activity: res.data.activity,
          generalManagerName: res.data.generalManagerName,
          salesManagerName: res.data.salesManagerName,
          email: res.data.email,
          addressInDetail: res.data.addressInDetail,
          clientJobCategory_Id: res.data.clientJobCategory_Id ? res.data.clientJobCategory_Id : null,
          clientJob_Id: res.data.clientJob_Id ? res.data.clientJob_Id : null,
          region_Id: res.data.region_Id ? res.data.region_Id : null,
          department_Id: res.data.department_Id ? res.data.department_Id : null,
          clientType_Id: res.data.clientType_Id ? res.data.clientType_Id : null
        })
        this.pathImage = this.url + res.data.imagePath;
        this.clientCommunicationWayForm.patchValue({
          clientCommunicationWay_Id: res.data.clientCommunicationWay_Id,
          communicationWayDate : res.data.communicationWayDate,
          communicationWayTime : res.data.communicationWayTime,
        })
        // this.clientCommunicationWay_Id = res.data.clientCommunicationWay_Id
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
  ListOfClientTypes(): void {
    this._ClientsService.ListOfClientTypes().subscribe({
      next: (res: Employees) => {
        this.listOfClientTypes = res.data;
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
  EditClientCommunicationWay() {
    this.clientCommunicationWayForm.patchValue({
      id: this.client_Id
    })
    console.log(this.clientCommunicationWayForm);
    this._ClientsService.EditClientCommunicationWay(this.clientCommunicationWayForm.value).subscribe({
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
  get CommunicationWayForm() {
    return this.clientCommunicationWayForm.controls
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
