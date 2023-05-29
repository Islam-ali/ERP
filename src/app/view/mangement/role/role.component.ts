import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY } from 'rxjs';
import { RoleService } from './role.service';
import { allRole } from '../modal/role';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  RoleForm: FormGroup;
  projectData: any[];
  image: any;
  submit: boolean = false;
  allRole: any[] = [];
  lableForm: number = 0;
  roleId: number = 0;
  loadingStatus: boolean = false;
  loadingRole: boolean = false;
  loader: boolean = true;
  loadingShow: boolean = true;
  constructor(
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _RoleService: RoleService,
    public translate: TranslateService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.RoleForm = this._formBuilder.group({
      name: [null, [Validators.required]],
    });
    this.getRole();
  }
  getRole(): void {
    this._RoleService.GetAllRoles().subscribe({
      next: (res: allRole) => {
        this.allRole = res.data;
        this.loader = false;
      }
    })
  }
  // 0 : add
  // 1 : Edit
  openModal(content: any, num: number): void {
    this.lableForm = num;
    this.RoleForm.reset();
    this.modalService.open(content);
  }
  patchValueForm(content: any, role: any) {
    this.lableForm = 1;
    this.showRole(role)
    this.modalService.open(content);
  }
  getUpdateRole(roleId: number): number {
    this.roleId = roleId;
    return roleId
  }
  UpdateRole(): void {
    let value = this.RoleForm.value;
    value['id'] = this.roleId
    this._RoleService.UpdateRole(value, this.roleId).subscribe({
      next: (res: allRole) => {
        this.getRole();
        this.loadingRole = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingRole = false;
        this.toastrService.error(err.message);

      }
    })
  }
  AddRole(): void {
    let value = this.RoleForm.value
    this._RoleService.CreateRole(value).subscribe({
      next: (res: allRole) => {
        this.getRole();
        this.loadingRole = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);

      }, error: (err: Error) => {
        this.loadingRole = false;
        this.toastrService.error(err.message);
      }
    })
  }
  showRole(role) {
    this.loadingShow = true;
    this.RoleForm.patchValue({
      name: role.name,
    })
    this.loadingShow = false;
  }
  delete(roleId: number) {
    this._RoleService.delete(roleId).subscribe({
      next: (res: allRole) => {
        this.toastrService.error(res.message);
        this.getRole();
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
      }
    })
  }
  onSubmit() {
    this.loadingRole = true;
    if (this.lableForm === 0 && this.RoleForm.invalid) {
      return
    } else {
      this.submit = true;
      this.lableForm === 0 ? this.AddRole() : this.UpdateRole();
    }
  }
  get form() {
    return this.RoleForm.controls;
  }
}
