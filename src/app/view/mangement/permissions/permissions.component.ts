import { Component, OnInit } from '@angular/core';
import { DataPermissions, Permissions } from '../modal/permissions';
import { PermissionsService } from './permissions.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  listOfCheckBoxes: any[] = [];
  ManageRolePermissions: DataPermissions;
  value: any = {};
  loader: boolean = false;
  roleId: string;
  loadingSubmit: boolean;
  constructor(
    private _PermissionsService: PermissionsService,
    private toastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.roleId = this._ActivatedRoute.snapshot.params['roleId'];
    this.GetManageRolePermissions();
  }

  ngOnInit(): void {
  }
  GetManageRolePermissions(): void {
    this.loader = true;
    this._PermissionsService.GetManageRolePermissions(this.roleId).subscribe({
      next: (res: Permissions) => {
        this.loader = false;
        this.ManageRolePermissions = res.data;
        this.listOfCheckBoxes = [];
        // this.listOfCheckBoxes = this.ManageRolePermissions.listOfCheckBoxes.map(x => this.mapListMangeRole(x))
        this.loader = false;
        // this.value['roleId'] = this.ManageRolePermissions.roleId
        // this.value['listOfCheckBoxes'] = this.listOfCheckBoxes.filter(x => x != undefined || x != null);
      }, error: (err: Error) => {
        this.loader = false;
        this.toastrService.error(err.message);
      }
    })
  }
  displayValue(val, displayValue) {
    return (val.displayValue == displayValue)
  }
  mapListMangeRole(val) {
    if (val.isSelected == true) {
      return { displayValue: val.displayValue, isSelected: val.isSelected }
    } else {
      return
    }
  }
  pushValue(displayValue: string, event: boolean) {
    const existed = this.listOfCheckBoxes.findIndex((x) => this.displayValue(x, displayValue));
    if (existed !== -1) {
      this.listOfCheckBoxes[existed]['isSelected'] = event
    } else {
      this.listOfCheckBoxes.push({ displayValue: displayValue, isSelected: event })
    }
    this.value['roleId'] = this.ManageRolePermissions.roleId
    this.value['listOfCheckBoxes'] = this.listOfCheckBoxes
  }
  onSubmit() {
    this.loadingSubmit = true;
    this._PermissionsService.UpdateRolePermissions(this.value).subscribe({
      next: (res: Permissions) => {
        this.toastrService.success(res.message);
        this.loadingSubmit = false;
        this.GetManageRolePermissions();
        this.modalService.dismissAll();
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
        this.loadingSubmit = false;
      }
    })
  }
  switchBackground(value: any) {
    switch (value) {
      case 'All':
        return 'bg-primary'
      case 'View':
        return 'bg-primary'
        break;
      case 'Create':
        return 'bg-success'
        break;
      case 'Edit':
        return 'bg-warning'
        break;
      case 'Delete':
        return 'bg-danger'
        break;
      default:
        break;
    }
  }
  switchBackgroundBadge(value: any) {
    switch (value) {
      case 'All':
        return 'badge-soft-primary'
      case 'View':
        return 'badge-soft-primary'
        break;
      case 'Create':
        return 'badge-soft-success'
        break;
      case 'Edit':
        return 'badge-soft-warning'
        break;
      case 'Delete':
        return 'badge-soft-danger'
        break;
      default:
        break;
    }
  }
}
