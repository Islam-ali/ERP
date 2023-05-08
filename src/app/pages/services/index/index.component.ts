import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Usergrid } from '../../contacts/usergrid/usergrid.model';

import { userGridData } from '../../contacts/usergrid/data';
import { EMPTY } from 'rxjs';
import { ServicesService } from '../services.service';
import { DataServices, Services, ShowService } from '../services';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  allServices:DataServices[] = [];
  userGridData: Usergrid[];
  selected;
  serviceForm: FormGroup;
  submitted = false;
  items: FormArray;
  // Select2 Dropdown
  selectValue: string[];
  image: any;
  lableForm: number = 0;
  serviceId: number = 0;
  loadingStatus: boolean = false;
  loadingServices: boolean = false;
  loader: boolean = true;
  submit: boolean = true;
  loadingShow:boolean = false;
  constructor(
    private modalService: NgbModal,
     private _formBuilder: FormBuilder,
     private _ServicesService:ServicesService,
     public translate: TranslateService
     ) { }

  ngOnInit() {
    this.serviceForm = this._formBuilder.group({
      name_ar: [null, [Validators.required]],
      name_en: [null, [Validators.required]],
      image: [null, [Validators.required]]
    });
        this.getServices();
    /**
     * fetches data
     */
    this._fetchData();
  }

  get form() {
    return this.serviceForm.controls;
  }
  getServices(): void {
    this._ServicesService.getServices().subscribe({
      next: (res: Services) => {
        this.allServices = res.data;
        this.loader = false;
      }
    })
  }
  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any, num: number): void {
    this.lableForm = num;
    this.serviceForm.reset();
    this.image = null;
    // num == 1 ? this.patchValueForm() : EMPTY
    this.modalService.open(content);
  }
  /**
   * User grid data fetches
   */
  private _fetchData() {
    this.userGridData = userGridData;
  }
  patchValueForm(content: any, Service: any) {
    this.lableForm = 1;
    this.showServices(Service.id)
    // this.image = Service.icon
    this.modalService.open(content);

  }
  showServices(ServiceId: number) {
    this.loadingShow = true;
    this._ServicesService.showServices(ServiceId).subscribe({
      next: (res: ShowService) => {
        this.loadingShow = false;
        this.serviceForm.patchValue({
          name_ar: res.data.name_ar,
          name_en: res.data.name_en,
          image: res.data.icon
        })
      }, error: (err: Error) => {
        this.loadingShow = false;
      }
    })
  }
  uploadeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      // var filesAmount = event.target.files.length;
      // for (let i = 0; i < filesAmount; i++) {
      var reader = new FileReader();
        this.image = event.target.files.item(0)
      // this.countriesForm.value.image = event.target.files.item(0);
      reader.onload = (event: any) => {
        this.serviceForm.patchValue({
          image : event.target.result
        })
  
      };
      reader.readAsDataURL(event.target.files[0]);
      // }
    }
  }
  getUpdateService(ServiceId: number): number {
    this.serviceId = ServiceId;
    return ServiceId
  }
  getServiceById(): void {
    let value = this.serviceForm.value
    const formData = new FormData();
    formData.append('name_ar', value.name_ar);
    formData.append('name_en', value.name_en);
    this.image ? formData.append('icon', this.image) : EMPTY;
    this._ServicesService.updateService(formData, this.serviceId).subscribe({
      next: (res: Services) => {
        this.getServices();
        this.loadingServices = false;
        this.modalService.dismissAll();
      }, error: (err: Error) => {
        this.loadingServices = false;

      }
    })
  }
  getAddService(): void {
    let value = this.serviceForm.value
    const formData = new FormData();
    formData.append('name_ar', value.name_ar);
    formData.append('name_en', value.name_en);
    formData.append('icon', this.image);
    this._ServicesService.addService(formData).subscribe({
      next: (res: Services) => {
        this.getServices();
        this.loadingServices = false;
        this.modalService.dismissAll();
      }, error: (err: Error) => {
        this.loadingServices = false;
      }
    })
  }
  changeActivate(event: boolean, ServiceId: number) {
    this.serviceId = ServiceId
    console.log(event);
    event ? this.activate(ServiceId) : this.deActivate(ServiceId);
  }
  activate(ServiceId: number) {
    this.loadingStatus = true;
    this._ServicesService.activate(ServiceId).subscribe({
      next: (res: Services) => {
        this.getServices();
        this.loadingStatus = false;
      }, error: (err: Error) => {
        this.loadingStatus = false;
      }
    })
  }
  deActivate(ServiceId: number) {
    this.loadingStatus = true;
    this._ServicesService.deactivate(ServiceId).subscribe({
      next: (res: Services) => {
        this.getServices();
        this.loadingStatus = false;
      }, error: (err: Error) => {
        this.loadingStatus = false;
      }
    })
  }
  delete(ServiceId: number) {
    this._ServicesService.delete(ServiceId).subscribe({
      next: (res: Services) => {
        this.getServices();
      }, error: (err: Error) => {

      }
    })
  }
  onSubmit() {
    this.loadingServices = true;
    if (this.lableForm === 0 && this.serviceForm.invalid) {
      return
    } else {
      this.submit = true;
      this.lableForm === 0 ? this.getAddService() : this.getServiceById();
    }
  }
}
