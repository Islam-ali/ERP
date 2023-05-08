import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Pagination, Users } from './users';
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
  userForm: FormGroup; // bootstrap validation form
  submit: boolean;
  image: any;
  lableForm: number = 0;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  loader: boolean = true;
  loadingUsers: boolean = false;
  UserId: number = 0;
  // TooltipLabel = TooltipLabel;
  pagination:Pagination;
  pageNumber:number = 1;
  CountryISO = CountryISO;
  preferredUsers: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.SaudiArabia
  ];
  constructor(
    private _UsersService: UsersService,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) {

    this.userForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      // country_code: ['', [Validators.required]],
      mobile_number: [null],
      image: [null],
      password_confirmation:[null]
    });
  }

  ngOnInit(): void {
    // this.breadCrumbItems = [];
    this.getAllUsers(this.pageNumber);
  }
  uploadeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      // var filesAmount = event.target.files.length;
      // for (let i = 0; i < filesAmount; i++) {
      var reader = new FileReader();
      this.userForm.patchValue({
        image: event.target.files.item(0)
      })
      reader.onload = (event: any) => {
        this.image = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      // }
    }
  }
  removeImage() {
    this.image = null;
    this.userForm.value.image = null;
  }
  // 0 : add
  // 1 : Edit
  openModal(content: any, num: number): void {
    this.lableForm = num;
    this.userForm.reset();
    this.image = null;
    // num == 1 ? this.patchValueForm() : EMPTY
    this.modalService.open(content);
  }
  paginationAllUsers(event:any){
    this.pageNumber = event
    this.getAllUsers(this.pageNumber);
  }
    
  getAllUsers(pageNumber:number): void {
    this.loader = true;

    this._UsersService.getUserss(pageNumber).subscribe({
      next: (res: Users) => {
        this.allUsers = res.data;
        this.pagination = res.pagination
        this.loader = false;

      },
      error: (error: Error) => {
        this.loader = false;

        console.log(error);
      }
    })
  }
  patchValueForm(content: any, user: any) {
    this.lableForm = 1;
    this.modalService.open(content);
    this.userForm.patchValue({
      mobile_number: user.mobile_number,
      // country_code: user.,
      name: user.name,
      email: user.email,
      // password: user.,
      image: user.image,
    })
  }
  getUpdateCountry(UserId: number): number {
    this.UserId = UserId;
    return UserId
  }
  getUserById(): void {
    let value = this.userForm.value
    const formData = new FormData();
    formData.append('mobile_number', value.mobile_number.e164Number);
    formData.append('country_code', value.mobile_number.countryCode);
    formData.append('name', value.name);
    formData.append('email', value.email);
    formData.append('password', value.password);
    formData.append('password_confirmation', value.password_confirmation);
    formData.append('image', value.image);
    this._UsersService.updateUser(formData, this.UserId).subscribe({
      next: (res: Users) => {
        this.getAllUsers(this.pageNumber);
        this.loadingUsers = false;
        this.modalService.dismissAll();
      }, error: (err: Error) => {
        this.loadingUsers = false;

      }
    })
  }
  getAddUser(): void {
    if (this.userForm.invalid) {
      return
    } else {
      let value = this.userForm.value
      const formData = new FormData();
      formData.append('mobile_number', value.mobile_number.e164Number);
      formData.append('country_code', value.mobile_number.countryCode);
      formData.append('name', value.name);
      formData.append('email', value.email);
      formData.append('password', value.password);
      formData.append('image', value.image);
      this._UsersService.addUser(formData).subscribe({
        next: (res: Users) => {
          this.loadingUsers = false;
          this.getAllUsers(this.pageNumber);
          this.modalService.dismissAll();
        }, error: (err: Error) => {
          this.loadingUsers = false;
        }
      })
      this.submit = true;
    }
  }
  onSubmit() {
    this.loadingUsers = true;
    if (this.lableForm === 0 && this.userForm.invalid) {
      return
    } else {
      this.submit = true;
      this.lableForm === 0 ? this.getAddUser() : this.getUserById();
    }
  }
  validSubmit() {
    console.log(this.userForm.value);
    if (this.userForm.invalid) {
      return
    } else {
      let value = this.userForm.value
      const formData = new FormData();
      formData.append('mobile_number', value.mobile_number.e164Number);
      formData.append('country_code', value.mobile_number.countryCode);
      formData.append('name', value.name);
      formData.append('email', value.email);
      formData.append('password', value.password);
      formData.append('image', value.image);
      this._UsersService.addUser(formData).subscribe({
        next: (res: Users) => {
          this.modalService.dismissAll()
        }
      })
      this.submit = true;
    }
  }
  delete(userId: number) {
    this._UsersService.delete(userId).subscribe({
      next: (res: Users) => {
        this.getAllUsers(this.pageNumber);
      }, error: (err: Error) => {

      }
    })
  }
  get form() {
    return this.userForm.controls;
  }
}
