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
  lietOfButton:any[] = [
    {
      value:'GENERAL.EDIT',
      link:'',
      icon:'mdi mdi-pencil'
    },
    {
      value:'VIEWCLIENTS.ADDNOTES',
      link:'',
      icon:'mdi mdi-notebook-edit'
    },
    {
      value:'VIEWCLIENTS.ARRANGEAPPOINTMENT',
      link:'',
      icon:'mdi mdi-calendar-clock'
    },
  ];
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
  clientID:number = 0;
  listOfClientTypes: any[] = [];
  listOfLotsOfClientStatus:any[]=[];

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ClientsService: ClientService,
    private toastrService: ToastrService,
    public _AuthenticationService: AuthenticationService,

  ) {
    this._ActivatedRoute.paramMap.subscribe((param: any) => {
      this.companyID = +param.params['companyID'];
      this.clientID = +param.params['id'];
      this.showClients(this.clientID);
    })
   }

  ngOnInit(): void {
    this.ListOfLotsOfClientStatus()
  }
  ListOfClientCommunicationWays(): void {
    this._ClientsService.ListOfClientCommunicationWays().subscribe({
      next: (res: ListOfClientJobs) => {
        this.listOfClientCommunicationWays = res.data;
      }
    })
  }
  ListOfLotsOfClientStatus(): void {
    this._ClientsService.ListOfLotsOfClientStatus().subscribe({
      next: (res: ListOfClientJobs) => {
        this.listOfLotsOfClientStatus = res.data;
      }
    })
  }
  showClients(clientId: number) {
    this.loadingShow = true;
    this._ClientsService.getclientById(clientId).subscribe({
      next: (res: showClient) => {
        this.loadingShow = false;
        this.clientDetails = res.data;
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
  changeStatus(clientStatus_Id:number,event:any){
    let value = {};
    value['id'] = clientStatus_Id
    value['clientStatus_Id'] = event.id

      this._ClientsService.EditClientStatus(value).subscribe({
        next: (res: Clients) => {
          this.showClients(event.id);
          this.GetAllClientsComments()      
          this.toastrService.success(res.message);
        }, error: (err: Error) => {
          this.toastrService.error(err.message);
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
