import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactoryService } from './factory.service';
import { DataFactory, DataFactoryProfile, Factory, FactoryProfile } from './factory';
import { Pagination } from 'app/core/modal/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassificationsService } from '../classifications/classifications.service';
import { ToastrService } from 'ngx-toastr';
import { CountriesService } from 'app/pages/countries/countries.service';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { Classifications, DataClassifications, ShowClassification } from '../classifications/classifications';
import { Countries } from 'app/pages/countries/countries';
import { EMPTY } from 'rxjs';
import { error } from 'protractor';
import { Error } from 'app/core/helpers/error';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
export class FactoryComponent implements OnInit {
  marker:any={
    lat: 30.759208, 
    lng:31.499547
  }
  classificationID: number = 0;
  factoriesData: DataFactory[];
  pagination: Pagination;
  pageNumber: number = 1;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredUsers: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.SaudiArabia
  ];
  FactoriesForm: FormGroup;
  image: any;
  CommercialRegisterImage:any;
  TaxCardFrontImage:any;
  TaxCardBackImage:any;
  submit: boolean = false;
  allFactories: DataClassifications[] = [];
  lableForm: number = 0;
  FactoryId: number = 0;
  loadingStatus: boolean = false;
  loadingFactories: boolean = false;
  loader: boolean = true;
  rangeValue: number = 0;
  loadingShow: boolean = false;
  countries: any[] = [];
  classifications: any[] = [];
  factoryProfileData:DataFactoryProfile;
  loaderFactoryProfile:boolean = false;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _FactoryService: FactoryService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _ClassificationsService: ClassificationsService,
    private toastrService: ToastrService,
    private _CountriesService: CountriesService,
  ) {
    this.FactoriesForm = this._formBuilder.group({
      mobile_number: [null],
      country_code: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      password_confirmation: [null ,[Validators.required]],
      country_id: [null],
      classification_id: [null],
      lng: [0],
      lat: [0],
      commercial_register_image: [null ],
      tax_card_front_image: [null ],
      tax_card_back_image: [null ],
      image: [null ],
    });
    this._ActivatedRoute.paramMap.subscribe((param: any) => {
      this.classificationID = +param.params['id'];
      this.getFactories();
    })
  }

  ngOnInit(): void {
    this.getClassifications();
     this.getCountries(); 
  }
  /**
  * @param position position where marker added
   */

 placeMarker(position: any) {
  this.FactoriesForm.patchValue({
    lat: position.coords.lat,
    lng: position.coords.lng
  })
 }
  getClassifications(): void {
    this._ClassificationsService.getListOfClassifications().subscribe({
      next: (res: Classifications) => {
        this.classifications = res.data;
      }
    })
  }
  getCountries(): void {
    this._CountriesService.getCountries().subscribe({
      next: (res: Countries) => {
        this.countries = res.data;
      }
    })
  }
  getFactories() {
    this._FactoryService.getFactories(this.classificationID, this.pageNumber).subscribe({
      next: (res: Factory) => {
        this.loader = false;
        this.factoriesData = res.data;
        this.pagination = res.pagination
      }, error: (err: Error) => {
        this.loader = false;
      }
    })
  }
  uploadeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.image = event.target.files.item(0)
      console.log(this.image);
      reader.onload = (event: any) => {
        this.FactoriesForm.patchValue({
          image: event.target.result
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  uploadeCommercialRegisterImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.CommercialRegisterImage = event.target.files.item(0)
      reader.onload = (event: any) => {
        this.FactoriesForm.patchValue({
          commercial_register_image: event.target.result
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  uploadeTaxCardFrontImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.TaxCardFrontImage = event.target.files.item(0);
      console.log(event.target.files , event.target.files.item(0));
      
      reader.onload = (event: any) => {
        this.FactoriesForm.patchValue({
          tax_card_front_image: event.target.result
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  uploadeTaxCardBackImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.TaxCardBackImage = event.target.files.item(0)
      reader.onload = (event: any) => {
        this.FactoriesForm.patchValue({
          tax_card_back_image: event.target.result
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  // 0 : add
  // 1 : Edit
  openMap(content): void{
    this.modalService.open(content, { size: 'lg' ,centered:true});
  }
  openModal(content: any, num: number): void {
    this.lableForm = num;
    this.FactoriesForm.reset();
    this.image = null;
    this.rangeValue = 0;
    // num == 1 ? this.patchValueForm() : EMPTY
    this.modalService.open(content, { size: 'lg' });
  }
  patchValueForm(content: any, Factory: any) {
    this.lableForm = 1;
    this.showFactory(Factory.id)
    this.modalService.open(content);


  }
  showFactory(countryId: number) {
    this.loadingShow = true;
    this._ClassificationsService.showFactory(countryId).subscribe({
      next: (res: ShowClassification) => {
        this.loadingShow = false;
        this.FactoriesForm.patchValue({
          name_ar: res.data.name_ar,
          name_en: res.data.name_en,
          image: res.data.image,
        })
        this.rangeValue = res.data.tarfok_percentage;
      }, error: (err: Error) => {
        this.loadingShow = false;
      }
    })
  }
  getUpdateFactory(FactoryId: number): number {
    this.FactoryId = FactoryId;
    return FactoryId
  }
  getFactoryById(): void {
    let value = this.FactoriesForm.value
    const formData = new FormData();
    formData.append('name_ar', value.name_ar);
    formData.append('name_en', value.name_en);
    this.image ? formData.append('image', this.image) : EMPTY;
    formData.append('tarfok_percentage', `${this.rangeValue}`);

    this._ClassificationsService.updateFactory(formData, this.FactoryId).subscribe({
      next: (res: Classifications) => {
        this.getFactories();
        this.loadingFactories = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);

      }, error: (err: Error) => {
        this.loadingFactories = false;
        this.toastrService.error(err.message);


      }
    })
  }
  getAddFactory(): void {
    let value = this.FactoriesForm.value
    const formData = new FormData();


    formData.append('mobile_number', value.mobile_number.e164Number);
    formData.append('country_code', value.mobile_number.countryCode);
    formData.append('name', value.name);
    formData.append('email', value.email);
    formData.append('password', value.password);
    formData.append('password_confirmation', value.password_confirmation);
    formData.append('country_id', value.country_id);
    formData.append('classification_id', value.classification_id);
    formData.append('lat', value.lat);
    formData.append('lng', value.lng);
    formData.append('image', this.image);
    formData.append('commercial_register_image', this.CommercialRegisterImage);
    formData.append('tax_card_front_image', this.TaxCardFrontImage);
    formData.append('tax_card_back_image', this.TaxCardBackImage);


    this._FactoryService.addFactory(formData).subscribe({
      next: (res: Factory) => {
        this.getFactories();
        this.loadingFactories = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingFactories = false;
        this.toastrService.error(err.message);
      }
    })
  }
  changeActivate(event: boolean, FactoryId: number) {
    this.FactoryId = FactoryId
    event ? this.activate(FactoryId) : this.deActivate(FactoryId);
  }
  activate(FactoryId: number) {
    this.loadingStatus = true;
    this._FactoryService.activate(FactoryId).subscribe({
      next: (res: Factory) => {
        this.getFactories();
        this.loadingStatus = false;
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingStatus = false;
        this.toastrService.error(err.message);
      }
    })
  }
  deActivate(FactoryId: number) {
    this.loadingStatus = true;
    this._FactoryService.deactivate(FactoryId).subscribe({
      next: (res: Factory) => {
        this.getFactories();
        this.loadingStatus = false;
        this.toastrService.error(res.message);
      }, error: (err: Error) => {
        this.loadingStatus = false;
        this.toastrService.error(err.message);
      }
    })
  }
  delete(FactoryId: number) {
    this._ClassificationsService.delete(FactoryId).subscribe({
      next: (res: Classifications) => {
        this.getFactories();
        this.toastrService.error(res.message);

      }, error: (err: Error) => {
        this.toastrService.error(err.message);
      }
    })
  }
  factoryProfile(factoryID:number , content:any){
    this.modalService.open(content, { size: 'lg' ,centered:true});
    this.loaderFactoryProfile = true;
    this._FactoryService.factoryProfile(factoryID).subscribe({
      next: (res: FactoryProfile) => {
        this.loaderFactoryProfile = false;
        this.factoryProfileData = res.data;
      }, error: (err: Error) => {
        this.loaderFactoryProfile = false;
      }
    })
  }
  onSubmit() {
    console.log(this.FactoriesForm);
    
    this.loadingFactories = true;
    // if (this.lableForm === 0 && this.FactoriesForm.invalid) {
    // this.loadingFactories = false;
    //   return
    // } else {
    //   this.submit = true;
      this.lableForm === 0 ? this.getAddFactory() : this.getFactoryById();
    // }
  }
  get form() {
    return this.FactoriesForm.controls;
  }
}
