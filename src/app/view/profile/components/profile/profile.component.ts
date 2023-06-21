import { Component, OnInit } from '@angular/core';
import { Profile, ProfileData } from '../../modal/profile';
import { ProfileService } from '../../services/profile.service';
import { environment as env } from '@env/environment';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { FormateDateService } from 'app/shared/services/formate-date.service';
import { AuthenticationService } from 'app/core/services/auth.service';
import { OwnedTasksService } from '../../services/owned-tasks.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  url: string = env.url;
  loaderProfile: boolean = false;
  ProfileData: ProfileData;
  pathUrl: string = env.url;
  EmployeeForm: FormGroup;
  OwnedTasksForm: FormGroup;
  image: any;
  coverPath: any;
  files: any[] = [];
  EmployeeId: number = 0;

  loadingEmployees: boolean = false;
  loader: boolean = true;
  loadingShow: boolean = false;
  placement = "top";
  ListOfId: number[] = [];
  textTask: string = '';

  constructor(
    private _ProfileService: ProfileService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _FormateDateService: FormateDateService,
    public _AuthenticationService: AuthenticationService,
    private _OwnedTasksService: OwnedTasksService
  ) {

    this.EmployeeForm = this._formBuilder.group({
      Address: [null],
      University: [null],
      Qualification: [null],
      // number
      NationalId: [null, [Validators.required, Validators.pattern('[0-9]+')]],
      Mobile: [null, [Validators.required, Validators.pattern('[0-9]+')]],
      // DATE
      GraduateDate: [null],
      BirthDate: [null],
      // FILES
      Files: this._formBuilder.array([this.initFormEmployee()]),
    });

  }

  ngOnInit(): void {
    this.Profile();
  }
  Profile() {
    this.loaderProfile = true;
    this._ProfileService.GetEmployeeProfile().subscribe({
      next: (res: Profile) => {
        this.loaderProfile = false;
        this.ProfileData = res.data;
        this.EmployeeForm.patchValue({
          Code: res.data.code,
          Name: res.data.name,

          Address: res.data.address,
          University: res.data.university,
          Qualification: res.data.qualification,

          NationalId: res.data.nationalId,
          Mobile: res.data.mobile,

          GraduateDate: this._FormateDateService.recivedFormateDate(res.data.graduateDate),
          BirthDate: this._FormateDateService.recivedFormateDate(res.data.birthDate),
          // ImagePath: res.data.imagePath ? `${this.pathUrl + res.data.imagePath}` : "",
          // CoverPath: res.data.coverPath ? `${this.pathUrl + res.data.coverPath}` : "",
          Files: res.data.files,
        })
        this.Employee.clear();
        this.addFormEmployee();
        res.data.files.forEach((ele: any, index: number) => {
          index > 0 ? this.addFormEmployee() : EMPTY;
          this.Employee.controls[index].patchValue({
            path: `${this.pathUrl + ele.filePath}`,
            id: ele.id,
            Description: ele.description
          })
        })
      }, error: (err: Error) => {
        this.loaderProfile = false;
      }
    })
  }


  uploadeFiles(event: any, index: number): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.Employee.controls[index].patchValue({
        File: event.target.files[0],
      })
      reader.onload = (event: any) => {
        this.Employee.controls[index].patchValue({
          path: event.target.result
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  initFormEmployee(): FormGroup {
    return this._formBuilder.group({
      Description: [null],
      id: [null],
      File: [null],
      path: null
    })
  }
  get Employee() {
    return this.EmployeeForm.controls["Files"] as FormArray;
  }
  addFormEmployee() {
    this.Employee.push(this.initFormEmployee());
  }
  deleteFormEmployee(index: number) {
    this.Employee.removeAt(index);
    this.files.splice(index, 1);
  }


  uploadeImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.image = event.target.files.item(0)
      reader.onload = (event: any) => {
        this.EmployeeForm.patchValue({
          ImagePath: event.target.result
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadeCoverPath(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.coverPath = event.target.files.item(0)
      reader.onload = (event: any) => {
        this.EmployeeForm.patchValue({
          CoverPath: event.target.result
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  OwnedTasks(event: any, index: number): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.Employee.controls[index].patchValue({
        File: event.target.files[0],
      })
      reader.onload = (event: any) => {
        this.Employee.controls[index].patchValue({
          path: event.target.result
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  patchValueForm(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }
  getUpdateEmployee(EmployeeId: number): number {
    this.EmployeeId = EmployeeId;
    return EmployeeId
  }
  EditEmployeeById(): void {
    let value = this.EmployeeForm.value
    value["GraduateDate"] = this._FormateDateService.sendFormateDate(this.EmployeeForm.get('GraduateDate').value);
    value["BirthDate"] = this._FormateDateService.sendFormateDate(this.EmployeeForm.get('BirthDate').value);
    // loop ton sen path
    value['Files'] = [];
    this.Employee.controls.forEach((ele: any) => {
      value['Files'].push({ id: ele.value.id, File: ele.value.File, Description: ele.value.Description })
    })
    value['id'] = this.EmployeeId;
    this._ProfileService.getEditEmployee(value).subscribe({
      next: (res: Profile) => {
        this.loadingEmployees = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);
        this.Profile();
      }, error: (err: Error) => {
        this.loadingEmployees = false;
        this.toastrService.error(err.message);
      }
    })
  }
  onSubmit() {
    this.loadingEmployees = true;
    if (this.EmployeeForm.invalid) {
      return
    }
    this.EditEmployeeById();
  }
  get form() {
    return this.EmployeeForm.controls;
  }
  Remove(id: number) {
    this.ListOfId.push(id)
    this.DeleteFileOrMoreOfEmployee();
  }
  DeleteFileOrMoreOfEmployee() {
    this._ProfileService.DeleteFileOrMoreOfEmployee(this.ListOfId).subscribe({
      next: (res: Profile) => {
        this.ListOfId = [];
        this.toastrService.error(res.message);
        this.Profile();
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
        this.Profile();
      }
    })
  }
}
