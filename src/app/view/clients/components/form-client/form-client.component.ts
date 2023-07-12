import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clients, DataListOfClientJobs, DatashowClient, ListOfClientJobs, showClient } from '../../modal/clients';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { DepartmentsService } from 'app/view/departments/services/departments.service';
import { EmployeesService } from 'app/view/employees/services/employees.service';
import { Employees } from 'app/view/employees/modal/employees';
import { EMPTY } from 'rxjs';
import { environment as env } from '@env/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})
export class FormClientComponent implements OnInit {
  url: string = env.url;
  companyID: number = 0;
  @Output() onForm: EventEmitter<any> = new EventEmitter();
  @Output() onReloade: EventEmitter<any> = new EventEmitter();
  clientsForm: FormGroup;
  files: any[] = [];
  ListOfClientJobs: DataListOfClientJobs[];
  ListOfClientJobCategories: DataListOfClientJobs[];
  clientCommunicationWay_Id: number = 0;
  listOfClientCommunicationWays: DataListOfClientJobs[];
  listOfStates: any[] = [];
  ListOfId: any[] = [];
  listOfRegion: any[] = [];
  listOfClientTypes: any[] = [];
  listOfDepartment: any[] = [];
  listOfClientSources: any[] = [];
  listOfClientContactImportances: any[] = [];
  clientID: number = 0;
  loadingShow: boolean = false;
  loadingclients: boolean = false;
  state_Id:any=null;
  clientDetails: DatashowClient;
  listOfLotsOfClientStatus:any[]=[];
  breadCrumbItems: Array<{}>;
  constructor(
    private _formBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _ClientsService: ClientService,
    private _DepartmentsService: DepartmentsService,
    private _EmployeesService: EmployeesService,
    private toastrService: ToastrService,
    private _Router: Router

  ) {
    this._ActivatedRoute.paramMap.subscribe((param: any) => {
      // this.loader = true;
      this.companyID = +param.params['companyID'];
      this.clientID = +param.params['id'];
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
      clientType_Id: [null, [Validators.required]],
      Latitude: [null],
      Longitude: [null],
      ClientStatus_Id:[null],
      ClientSource_Id:[null],
      ClientContactImportance_Id:[null],
      ClientAddresses: this._formBuilder.array([]),
      ClientContactLists: this._formBuilder.array([]),
      Files: this._formBuilder.array([]),
    });
  }
  // files array
  initFormFileClient(): FormGroup {
    return this._formBuilder.group({
      Description: [null],
      File: [null],
      path: [null],
      id: [null]
    })
  }
  get formFileClient() {
    return this.clientsForm.controls["Files"] as FormArray;
  }
  addFormFileClient() {
    this.formFileClient.push(this.initFormFileClient());
  }
  deleteFormFileClient(index: number) {
    this.formFileClient.removeAt(index);
    this.files.splice(index, 1);
  }
  // ClientAddresses
  initFormClientAddresses(): FormGroup {
    return this._formBuilder.group({
      StreetAddress1: [null , Validators.required],
      StreetAddress2: [null , Validators.required],
      PostalCode: [null , Validators.required],
      state: [null , Validators.required],
      region: [null , Validators.required],
    })
  }
  get ClientAddresses() {
    return this.clientsForm.controls["ClientAddresses"] as FormArray;
  }
  addFormClientAddresses() {
    this.ClientAddresses.push(this.initFormClientAddresses());
  }
  deleteFormClientAddresses(index: number) {
    this.ClientAddresses.removeAt(index);
  }
  // ClientContactLists
  initFormClientContactLists(): FormGroup {
    return this._formBuilder.group({
      FirstName: [null , Validators.required],
      LastName: [null , Validators.required],
      Telephone: [null, [Validators.required , Validators.pattern('[0-9]+')]],
      Mobile: [null, [Validators.required , Validators.pattern('[0-9]+')]],
      Email: [null, [Validators.required , Validators.email]],
    })
  }
  get ClientContactLists() {
    return this.clientsForm.controls["ClientContactLists"] as FormArray;
  }
  addFormClientContactLists() {
    this.ClientContactLists.push(this.initFormClientContactLists());
  }
  deleteFormClientContactLists(index: number) {
    this.ClientContactLists.removeAt(index);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'clients' , url:`companies/${this.companyID}/clients` }, { label: 'Add', active: true }];

    this.getListOfClientJobCategories();
    this.ListOfClientSources();
    this.ListOfClientContactImportances();
    this.getListOfStates();
    this.ListOfClientTypes();
    this.ListOfDepartment();
    this.ListOfLotsOfClientStatus();
    this.clientID ? this.showClients(this.clientID) : EMPTY;
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
  uploadImg(event: any , index: number): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.formFileClient.controls[index].patchValue({
        File: event.target.files[0]
      })
      reader.onload = (event: any) => {
        this.formFileClient.controls[index].patchValue({
          path: event.target.result
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
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
  ListOfLotsOfClientStatus(): void {
    this._ClientsService.ListOfLotsOfClientStatus().subscribe({
      next: (res: ListOfClientJobs) => {
        this.listOfLotsOfClientStatus = res.data;
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
  ListOfClientSources(): void {
    this._ClientsService.ListOfClientSources().subscribe({
      next: (res: ListOfClientJobs) => {
        this.listOfClientSources = res.data
      }
    })
  }  
  ListOfClientContactImportances(): void {
    this._ClientsService.ListOfClientContactImportances().subscribe({
      next: (res: ListOfClientJobs) => {
        this.listOfClientContactImportances = res.data
      }
    })
  }
  get form() {
    return this.clientsForm.controls;
  }
  showClients(clientId: number) {
    this.loadingShow = true;
    this._ClientsService.getclientById(clientId).subscribe({
      next: (res: showClient) => {
        this.state_Id = res.data.state_Id != 0 ? res.data.state_Id : null;
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
          ClientStatus_Id: res.data.clientStatus_Id ? res.data.clientStatus_Id : null,
          ClientSource_Id: res.data.clientSource_Id ? res.data.clientSource_Id : null,
          ClientContactImportance_Id: res.data.clientContactImportance_Id ? res.data.clientContactImportance_Id : null,
          clientType_Id: res.data.clientType_Id ? res.data.clientType_Id : null,
        })
        this.clientCommunicationWay_Id = res.data.clientCommunicationWay_Id;
        res.data.clientAddresses.forEach((ele: any, index: number) => {
          this.addFormClientAddresses();
          this.ClientAddresses.controls[index].patchValue({
            StreetAddress1: res.data.clientAddresses[index].streetAddress1,
            StreetAddress2: res.data.clientAddresses[index].streetAddress2,
            PostalCode: res.data.clientAddresses[index].postalCode,
            state: res.data.clientAddresses[index].state,
            region: res.data.clientAddresses[index].region,
          })
        })
        res.data.clientContactLists.forEach((ele: any, index: number) => {
          this.addFormClientContactLists();
          this.ClientContactLists.controls[index].patchValue({
            FirstName: res.data.clientContactLists[index].firstName,
            LastName: res.data.clientContactLists[index].lastName,
            Telephone: res.data.clientContactLists[index].telephone,
            Mobile: res.data.clientContactLists[index].mobile,
            Email: res.data.clientContactLists[index].email,
          })
        })
        res.data.atachments.forEach((ele: any, index: number) => {
          this.addFormFileClient();
          this.formFileClient.controls[index].patchValue({
            path: `${this.url + ele.file}`,
            Description: ele.description,
            id: ele.id,
          })
        })
      }, error: (err: Error) => {
        this.loadingShow = false;
      }
    })
  }
  RemoveImage(id: number) {
    this.ListOfId.push(id)
    this.DeleteFileOrMoreOfEmployee();
  }
  DeleteFileOrMoreOfEmployee() {
    this._ClientsService.DeleteFileOrMoreOfClient(this.ListOfId).subscribe({
      next: (res: Clients) => {
        this.ListOfId = [];
        this.toastrService.error(res.message);
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
      }
    })
  }
  updateClients(): void {
    let value = this.clientsForm.value;
    value['id'] = this.clientID
    this._ClientsService.updateClients(value, this.clientID).subscribe({
      next: (res: Clients) => {
        // this.onReloade.emit()
        this.loadingclients = false;
        // this.modalService.dismissAll();
        this._Router.navigate(['/companies', this.companyID, 'clients'])
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingclients = false;
        this.toastrService.error(err.message);
      }
    })
  }

  getAddClients(): void {
    let value = this.clientsForm.value;
    this._ClientsService.addClient(value).subscribe({
      next: (res: Clients) => {
        // this.onReloade.emit()
        this.loadingclients = false;
        // this.modalService.dismissAll();
        this._Router.navigate(['/companies', this.companyID, 'clients'])
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingclients = false;
        this.toastrService.success(err.message);
      }
    })
  }
  onSubmit() {
    this.loadingclients = true;
    !this.clientID ? this.getAddClients() : this.updateClients();
  }
}
