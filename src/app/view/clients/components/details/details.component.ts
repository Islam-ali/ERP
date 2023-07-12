import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'app/core/services/auth.service';
import { EmployeesService } from 'app/view/employees/services/employees.service';
import { AllClientsComments, Clients, DataDataClients, DataListOfClientJobs, DataShowClientsComments, DatashowClient, ListOfClientJobs, showClient } from '../../modal/clients';
import { Employees } from 'app/view/employees/modal/employees';
import { EMPTY } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment as env } from '@env/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  url: string = env.url;
  ListOfClientJobs: DataListOfClientJobs[];
  ListOfClientJobCategories: DataListOfClientJobs[];
  classificationID: number = 0;
  clientsData: DataDataClients[] = [];
  // pagination: Pagination;
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

  listOfClientTypes: any[] = [];
  listOfLotsOfClientStatus:any[]=[];

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ClientsService: ClientService,
    private toastrService: ToastrService,
    public _AuthenticationService: AuthenticationService,
    private _EmployeesService: EmployeesService

  ) { }

  ngOnInit(): void {
  }
  ListOfClientCommunicationWays(): void {
    this._ClientsService.ListOfClientCommunicationWays().subscribe({
      next: (res: ListOfClientJobs) => {
        this.listOfClientCommunicationWays = res.data;
      }
    })
  }
  showClients(clientId: number) {
    this.loadingShow = true;
    this._ClientsService.getclientById(clientId).subscribe({
      next: (res: showClient) => {
        // this.getListOfRegions(this.state_Id);
        this.loadingShow = false;
        this.clientDetails = res.data;
        // res.data.clientJobCategory_Id ? this.getListOfClientJobs(res.data.clientJobCategory_Id) : EMPTY;
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
        this.clientCommunicationWayForm.patchValue({
          clientCommunicationWay_Id: res.data.clientCommunicationWay_Id,
          communicationWayDate: res.data.communicationWayDate,
          communicationWayTime: res.data.communicationWayTime,
        })
        // this.clientCommunicationWay_Id = res.data.clientCommunicationWay_Id
      }, error: (err: Error) => {
        this.loadingShow = false;
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
  EditClientCommunicationWay() {
    this.clientCommunicationWayForm.patchValue({
      id: this.client_Id
    })
    console.log(this.clientCommunicationWayForm);
    this._ClientsService.EditClientCommunicationWay(this.clientCommunicationWayForm.value).subscribe({
      next: (res: Clients) => {
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
      }
    })
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
