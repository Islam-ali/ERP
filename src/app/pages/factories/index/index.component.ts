import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FactoriesServies } from '../factories.service';
import { EMPTY } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  CountryISO,
  SearchCountryField,
} from "ngx-intl-tel-input";
import { CountriesService } from 'app/pages/countries/countries.service';
import { Countries } from 'app/pages/countries/countries';
import { ClassificationsService } from '../classifications/classifications.service';
import { Classifications, DataClassifications, ShowClassification } from '../classifications/classifications';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredUsers: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.SaudiArabia
  ];
  FactoriesForm: FormGroup;
  image: any;
  submit: boolean = false;
  allFactories: DataClassifications[] = [];
  lableForm: number = 0;
  FactoryId: number = 0;
  loadingStatus: boolean = false;
  loadingFactories: boolean = false;
  loader:boolean = true;
  rangeValue:number=0;
  loadingShow:boolean = false;
  countries:any[]=[];
  classifications:any[]=[];

  constructor(
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _ClassificationsService : ClassificationsService,
    private toastrService: ToastrService,
  private _CountriesService:CountriesService,

  ) { 
    this.FactoriesForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      // country_code: ['', [Validators.required]],
      mobile_number: [null],
      password_confirmation: [null],
      country_id: [null],
      classification_id: [null],
      lng: [null],
      lat: [null],
      commercial_register_image:[[Validators.required, Validators.email]],
      tax_card_front_image:[[Validators.required, Validators.email]],
      tax_card_back_image:[[Validators.required, Validators.email]],
      image:[[Validators.required, Validators.email]],

    });
  }
    getClassifications(): void {
    this._ClassificationsService .getFactories().subscribe({
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
  ngOnInit(): void {
    this.getClassifications();
    this.getCountries();
    this.getFactories();
  }
  getFactories(): void {
    this._ClassificationsService .getFactories().subscribe({
      next: (res: Classifications) => {
        this.allFactories = res.data;
        this.loader = false;
      }
    })
  }
  uploadeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      // var filesAmount = event.target.files.length;
      // for (let i = 0; i < filesAmount; i++) {
      var reader = new FileReader();
        this.image = event.target.files.item(0)
      // this.FactoriesForm.value.image = event.target.files.item(0);
      reader.onload = (event: any) => {
        this.FactoriesForm.patchValue({
          image : event.target.result

        })
  
      };
      reader.readAsDataURL(event.target.files[0]);
      // }
    }
  }
  // 0 : add
  // 1 : Edit
  openModal(content: any, num: number): void {
    this.lableForm = num;
    this.FactoriesForm.reset();
    this.image = null;
    this.rangeValue = 0;
    // num == 1 ? this.patchValueForm() : EMPTY
    this.modalService.open(content, { size: 'lg'});
  }
  patchValueForm(content: any, Factory: any) {
    this.lableForm = 1;
    this.showFactory(Factory.id)
    this.modalService.open(content);


  }
  showFactory(countryId: number) {
    this.loadingShow = true;
    this._ClassificationsService .showFactory(countryId).subscribe({
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

    this._ClassificationsService .updateFactory(formData, this.FactoryId).subscribe({
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
    formData.append('name_ar', value.name_ar);
    formData.append('name_en', value.name_en);
    formData.append('image', this.image);
    formData.append('tarfok_percentage', `${this.rangeValue}`);

    this._ClassificationsService .addFactory(formData).subscribe({
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
  changeActivate(event: boolean, FactoryId: number) {
    this.FactoryId = FactoryId
    event ? this.activate(FactoryId) : this.deActivate(FactoryId);
  }
  activate(FactoryId: number) {
    this.loadingStatus = true;
    this._ClassificationsService .activate(FactoryId).subscribe({
      next: (res: Classifications) => {
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
    this._ClassificationsService .deactivate(FactoryId).subscribe({
      next: (res: Classifications) => {
        this.getFactories();
        this.loadingStatus = false;
                        this.toastrService.warning(res.message);
      }, error: (err: Error) => {
        this.loadingStatus = false;
                        this.toastrService.error(err.message);
      }
    })
  }
  delete(FactoryId: number) {
    this._ClassificationsService .delete(FactoryId).subscribe({
      next: (res: Classifications) => {
        this.getFactories();
                        this.toastrService.error(res.message);
        
      }, error: (err: Error) => {
                        this.toastrService.error(err.message);

        
      }
    })
  }
  onSubmit() {
    this.loadingFactories = true;
    if (this.lableForm === 0 && this.FactoriesForm.invalid) {
      return
    } else {
      this.submit = true;
      this.lableForm === 0 ? this.getAddFactory() : this.getFactoryById();
    }
  }
  get form() {
    return this.FactoriesForm.controls;
  }
}
