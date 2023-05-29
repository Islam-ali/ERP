import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataDataUserRole, DataManageUserRoles, ListOfCheckBox, ManageUserRoles, UserRole } from '../modal/user-role';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserRoleService } from './user-role.service';
import { EMPTY } from 'rxjs';
import { Error } from 'app/core/helpers/error';
import { error } from 'protractor';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

  countriesForm: FormGroup;
  image: any;
  submit: boolean = false;
  DataUserRole: DataDataUserRole[];
  DataManageUserRoles: DataManageUserRoles;
  lableForm: string = '';
  userId: number = 0;
  loadingStatus: boolean = false;
  loadingSubmit: boolean = false;
  loader: boolean = true;
  loadingShow: boolean = true;
  currentPage: number = 1;
  value: any = {};
  listOfCheckBoxes: any[] = [];
  constructor(
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private _UserRoleService: UserRoleService
  ) { }

  ngOnInit(): void {
    this.GetEachUserWithHisRoles();
  }

  GetEachUserWithHisRoles(): void {
    this._UserRoleService.GetEachUserWithHisRoles(this.currentPage).subscribe({
      next: (res: UserRole) => {
        this.DataUserRole = res.data.data;
        this.loader = false;
      }
    })
  }
  ManageUserRolesById(userId: string): void {
    this.loadingShow = true;
    this._UserRoleService.ManageUserRolesById(userId).subscribe({
      next: (res: ManageUserRoles) => {
        this.loadingShow = false;
        this.DataManageUserRoles = res.data
        this.loader = false;
      }, error: (err: Error) => {
        this.loader = false;
        this.toastrService.error(err.message);
      }
    })
  }

  openModal(content: any, user: any): void {
    this.lableForm = user.userName;
    this.ManageUserRolesById(user.id)
    this.listOfCheckBoxes = [];
    this.modalService.open(content);
  }
  pushValue(displayValue, event: boolean) {
    let index = this.listOfCheckBoxes.length > 0 ? this.listOfCheckBoxes.findIndex(x => x.displayValue == displayValue) : -1
    if (index == -1) {
      this.listOfCheckBoxes.push({ displayValue: displayValue, isSelected: event })
      this.value['userId'] = this.DataManageUserRoles.userId
      this.value['userName'] = this.DataManageUserRoles.userName
      this.value['listOfCheckBoxes'] = this.listOfCheckBoxes
    } else {
      this.listOfCheckBoxes.splice(index, 1);
      this.listOfCheckBoxes.push({ displayValue: displayValue, isSelected: event })
    }
  }

  getUpdateuser(userId: number): number {
    this.userId = userId;
    return userId
  }
  onSubmit() {
    this.loadingSubmit = true;
    this._UserRoleService.UpdateUserRoles(this.value).subscribe({
      next: (res: ManageUserRoles) => {
        this.toastrService.success(res.message);
        this.loadingSubmit = false;
        this.GetEachUserWithHisRoles();
        this.modalService.dismissAll();
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
        this.loadingSubmit = false;
      }
    })
  }
}
