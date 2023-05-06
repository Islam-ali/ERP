import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Users } from './users';
import { ErrorInterceptor } from 'app/core/helpers/error.interceptor';
import { Error } from 'app/core/helpers/error';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CountryISO,
  SearchCountryField,
} from "ngx-intl-tel-input";
import { User } from 'app/core/models/auth.models';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  allUsers: Users[];
  validationform: FormGroup; // bootstrap validation form
  submit: boolean;
  image:any;

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  // TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.SaudiArabia
  ];
  constructor(
    private _UsersService:UsersService,
    private modalService: NgbModal,
    private _formBuilder:FormBuilder
  ) {
    
    this.validationform = this._formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      // country_code: ['', [Validators.required]],
      mobile_number: [null],
      image:[null]
    });
   }

  ngOnInit(): void {
        this.breadCrumbItems = [];
        this.getAllUsers();
  }
  uploadeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      // var filesAmount = event.target.files.length;
      // for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        this.validationform.value.image = event.target.files.item(0);
        reader.onload = (event: any) => {
          this.image = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      // }
    }
  }
  removeImage(){
    this.image = null;
    this.validationform.value.image = null;
  }
  getAllUsers(){
    this._UsersService.getUsers().subscribe({
      next:(res:Users)=>{
        this.allUsers = res.data
      },
      // error:(error:Error)=>{
        
      // }
    })
  }

  openModal(content: any) {
    this.modalService.open(content);
  }
  validSubmit() {
    console.log(this.validationform.value);
    if(this.validationform.invalid){
      return
    }else{
      let value = this.validationform.value
      const formData = new FormData();
      formData.append('mobile_number',value.mobile_number.e164Number);
      formData.append('country_code',value.mobile_number.countryCode);
      formData.append('name',value.name);
      formData.append('email',value.email);
      formData.append('password',value.password);
      formData.append('image',value.image);
      this._UsersService.addUser(formData).subscribe({
        next:(res:Users)=>{
        }
      })
      this.submit = true;
    } 
  }
  get form() {
    return this.validationform.controls;
  }
}
