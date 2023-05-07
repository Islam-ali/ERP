import { Component, OnInit } from '@angular/core';
import { Project } from 'app/pages/projects/project.model';
import { projectData } from '../../projects/projectdata';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Countries, DataCountries } from '../countries';
import { CountriesService } from '../countries.service';
import { EMPTY } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  countriesForm: FormGroup;
  projectData: Project[];
  image: any;
  submit: boolean = false;
  allCountries: DataCountries[] = [];
  lableForm: number = 0;
  countryId: number = 0;
  loadingStatus: boolean = false;
  loadingCountries: boolean = false;
  loader:boolean = true;
  constructor(
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _CountriesService: CountriesService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.projectData = projectData;
    this.countriesForm = this._formBuilder.group({
      name_ar: [null, [Validators.required]],
      name_en: [null, [Validators.required]],
      image: [null, [Validators.required]]
    });
    this.getCountries();
    // this.getUserss();
  }
  // getUserss(){
  //   this._CountriesService.getUserss().subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //     }
  //   })
  // }
  getCountries(): void {
    this._CountriesService.getCountries().subscribe({
      next: (res: Countries) => {
        this.allCountries = res.data;
        this.loader = false;
      }
    })
  }
  uploadeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      // var filesAmount = event.target.files.length;
      // for (let i = 0; i < filesAmount; i++) {
      var reader = new FileReader();
      this.countriesForm.patchValue({
        image: event.target.files.item(0)
      })
      // this.countriesForm.value.image = event.target.files.item(0);
      reader.onload = (event: any) => {
        this.image = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      // }
    }
  }
  // 0 : add
  // 1 : Edit
  openModal(content: any, num: number): void {
    this.lableForm = num;
    this.countriesForm.reset();
    this.image = null;
    // num == 1 ? this.patchValueForm() : EMPTY
    this.modalService.open(content);
  }
  patchValueForm(content: any, country: any) {
    this.lableForm = 1;
    this.countriesForm.patchValue({
      name_ar: country.name,
      name_en: country.name,
      // image: country.flag
    })
    this.image = country.flag
    this.modalService.open(content);
    console.log(this.countriesForm);

  }
  getUpdateCountry(countryId: number): number {
    this.countryId = countryId;
    return countryId
  }
  getCountryById(): void {
    let value = this.countriesForm.value
    const formData = new FormData();
    formData.append('name_ar', value.name_ar);
    formData.append('name_en', value.name_en);
    value.image ? formData.append('flag', value.image) : EMPTY;
    this._CountriesService.updateCountry(formData, this.countryId).subscribe({
      next: (res: Countries) => {
        this.getCountries();
        this.loadingCountries = false;
        this.modalService.dismissAll();
      }, error: (err: Error) => {
        this.loadingCountries = false;

      }
    })
  }
  getAddCountry(): void {
    let value = this.countriesForm.value
    const formData = new FormData();
    formData.append('name_ar', value.name_ar);
    formData.append('name_en', value.name_en);
    formData.append('flag', value.image);
    this._CountriesService.addCountry(formData).subscribe({
      next: (res: Countries) => {
        this.getCountries();
        this.loadingCountries = false;
        this.modalService.dismissAll();
      }, error: (err: Error) => {
        this.loadingCountries = false;
      }
    })
  }
  changeActivate(event: boolean, countryId: number) {
    this.countryId = countryId
    console.log(event);
    event ? this.activate(countryId) : this.deActivate(countryId);
  }
  activate(countryId: number) {
    this.loadingStatus = true;
    this._CountriesService.activate(countryId).subscribe({
      next: (res: Countries) => {
        this.getCountries();
        this.loadingStatus = false;
      }, error: (err: Error) => {
        this.loadingStatus = false;
      }
    })
  }
  deActivate(countryId: number) {
    this.loadingStatus = true;
    this._CountriesService.deactivate(countryId).subscribe({
      next: (res: Countries) => {
        this.getCountries();
        this.loadingStatus = false;
      }, error: (err: Error) => {
        this.loadingStatus = false;
      }
    })
  }
  delete(countryId: number) {
    this._CountriesService.delete(countryId).subscribe({
      next: (res: Countries) => {
        this.getCountries();
      }, error: (err: Error) => {

      }
    })
  }
  onSubmit() {
    this.loadingCountries = true;
    if (this.lableForm === 0 && this.countriesForm.invalid) {
      return
    } else {
      this.submit = true;
      this.lableForm === 0 ? this.getAddCountry() : this.getCountryById();
    }
  }
  get form() {
    return this.countriesForm.controls;
  }
}
