import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { listData } from 'app/pages/invoices/list/data';
import { InvoiceList } from 'app/pages/invoices/list/list.model';
import { EmployeesService } from '../../services/employees.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { DataEmployees, Employees, ShowEmployees } from '../../modal/employees';
import { environment as env } from '@env/environment';
import { JobsService } from 'app/view/jobs/Services/jobs.service';
import { DepartmentsService } from 'app/view/departments/services/departments.service';
import { FormateDateService } from 'app/shared/services/formate-date.service';
import { EMPTY } from 'rxjs';
import { ProfileService } from 'app/view/profile/services/profile.service';
import { Profile } from 'app/view/profile/modal/profile';
import { AuthenticationService } from 'app/core/services/auth.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  pathUrl: string = env.url;
  EmployeeForm: FormGroup;
  image: any;
  coverPath: any;
  files: any[] = [];
  submit: boolean = false;
  allEmployees: DataEmployees[] = [];
  lableForm: number = 0;
  EmployeeId: number = 0;
  loadingStatus: boolean = false;
  loadingEmployees: boolean = false;
  loader: boolean = true;
  rangeValue: number = 0;
  loadingShow: boolean = false;
  companyID: number = 0;
  departmentID: number = 0;
  listOfMilitaryStatus: any[] = [];
  listOfMaritalStatus: any[] = [];
  listOfStates: any[] = [];
  listOfStatus: any[] = [];
  listOfRegion: any[] = [];
  listOfGender: any[] = [];
  listOfJob: any[] = [];
  listOfEmployees: any[] = [];
  listOfDepartment: any[] = [];
  placement = "top";
  state_id = 0 ;
  department_id = 0;
  ListOfId:any[]=[];
  constructor(
    private _formBuilder: FormBuilder,
    private _EmployeesService: EmployeesService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _JobsService: JobsService,
    private _DepartmentsService: DepartmentsService,
    private _FormateDateService: FormateDateService,
    private _ProfileService: ProfileService,
    public _AuthenticationService : AuthenticationService,
    private _location: Location,
  ) {
    this.companyID = this._ActivatedRoute.snapshot.params['companyID'];
    this.departmentID = this._ActivatedRoute.snapshot.params['departmentID']!;

    this.EmployeeForm = this._formBuilder.group({
      Code: [null],
      Name: [null, [Validators.required]],
      NameInEnglish: [null, [Validators.required]],
      Email: [null],
      Address: [null],
      University: [null],
      Qualification: [null],
      // number
      id: [null],
      NationalId: [null, [Validators.required, Validators.pattern('[0-9]+')]],
      Mobile: [null, [Validators.required, Validators.pattern('[0-9]+')]],
      Salary: [null, [Validators.required, Validators.pattern('[0-9]+')]],
      // boolean
      IsDepartmentManager: [false],
      // DATE
      HireDate: [null, [Validators.required]],
      GraduateDate: [null],
      BirthDate: [null],
      // LIST ID
      MilitaryStatus_Id: [null, [Validators.required]],
      MaritalStatus_Id: [null, [Validators.required]],
      Status_Id: [null, [Validators.required]],
      Region_Id: [null, [Validators.required]],
      Gender_Id: [null, [Validators.required]],
      Job_Id: [null, [Validators.required]],
      SuperVisor_Id: [null],
      // optional
      state_Id: [null],
      department_Id: [null],
      // FILES
      ImagePath: [null],
      CoverPath: [null],
      Files: this._formBuilder.array([this.initFormEmployee()]),
    });
  }
  goBack() {
    this._location.back();
  }
  ngOnInit(): void {
    this.getEmployees();
    this.getListsDropdown();
    // this.Employee.controls[0].get('File').dirty
  }
  initFormEmployee():FormGroup {
    return this._formBuilder.group({
      Description:[null],
      File:[null],
      path:null
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

  getListsDropdown() {
    this.getListOfMilitaryStatus();
    this.getListOfMaritalStatus();
    this.getListOfHrStatus();
    this.getListOfStates();
    this.getListOfGenders();
    this.getListOfDepartment();
    this.getListOfEmployees();
  }
  getEmployees(): void {
    this._EmployeesService.getAllEmployees(this.companyID).subscribe({
      next: (res: Employees) => {
        this.allEmployees = res.data;
        this.loader = false;
      },error:(err:Error) => {
        this.loader = false;
      }
    })
  }
  getListOfMilitaryStatus(): void {
    this._EmployeesService.ListOfMilitaryStatus().subscribe({
      next: (res: Employees) => {
        this.listOfMilitaryStatus = res.data;
      }
    })
  }
  getListOfMaritalStatus(): void {
    this._EmployeesService.ListOfMaritalStatus().subscribe({
      next: (res: Employees) => {
        this.listOfMaritalStatus = res.data;
      }
    })
  }
  getListOfHrStatus(): void {
    this._EmployeesService.ListOfStatus().subscribe({
      next: (res: Employees) => {
        this.listOfStatus = res.data;
      }
    })
  }
  getListOfStates(): void {
    this._EmployeesService.ListOfStates().subscribe({
      next: (res: Employees) => {
        this.listOfStates = res.data;
      }
    })
  }
  getListOfRegions(stateID: number): void {
    console.log(stateID);
    stateID ?
    this._EmployeesService.ListOfRegions(stateID).subscribe({
      next: (res: Employees) => {
        this.listOfRegion = res.data;
      }
    }) : this.listOfRegion = [];
  }
  getListOfGenders(): void {
    this._EmployeesService.ListOfGenders().subscribe({
      next: (res: Employees) => {
        this.listOfGender = res.data;
      }
    })
  }
  getListOfJob(departmentID: number): void {
    departmentID ?
    this._JobsService.ListOfJob(departmentID).subscribe({
      next: (res: Employees) => {
        this.listOfJob = res.data;
      }
    }) : this.listOfJob = [];
  }
  getListOfDepartment(): void {
    this._DepartmentsService.ListOfDepartment(this.companyID).subscribe({
      next: (res: Employees) => {
        this.listOfDepartment = res.data;
      }
    })
  }
  getListOfEmployees(): void {
    this._EmployeesService.ListOfEmployees(this.companyID).subscribe({
      next: (res: Employees) => {
        this.listOfEmployees = res.data;
      }
    })
  }

  // uploadeImage(event: any): void {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     this.image = event.target.files.item(0)
  //     reader.onload = (event: any) => {
  //       this.EmployeeForm.patchValue({
  //         ImagePath: event.target.result
  //       })
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }

  // uploadeCoverPath(event: any): void {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     this.coverPath = event.target.files.item(0)
  //     reader.onload = (event: any) => {
  //       this.EmployeeForm.patchValue({
  //         CoverPath: event.target.result
  //       })
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }
  uploadeFiles(event: any , index:number): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.Employee.controls[index].patchValue({
        File: event.target.files[0]
      })
      reader.onload = (event: any) => {
        this.Employee.controls[index].patchValue({
          path: event.target.result
        })
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  // 0 : add
  // 1 : Edit
  openModal(content: any, num: number): void {
    this.lableForm = num;
    this.EmployeeForm.reset();
    this.image = null;
    this.rangeValue = 0;
    // num == 1 ? this.patchValueForm() : EMPTY
    this.EmployeeForm.controls["Email"].setValidators( [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]);
    this.Employee.clear();
    this.addFormEmployee();
    this.modalService.open(content, { size: 'xl' });

  }
  patchValueForm(content: any, company: any) {
    this.EmployeeForm.reset();
    this.lableForm = 1;
    this.EmployeeForm.controls["Email"].clearValidators();
    this.Employee.clear();
    this.addFormEmployee();
    this.showEmployee(company.id)
    this.modalService.open(content, { size: 'xl' });
  }
  showEmployee(EmployeeID: number) {
    this.getUpdateEmployee(EmployeeID)
    this.loadingShow = true;
    this._EmployeesService.getEmployeeById(EmployeeID).subscribe({
      next: (res: ShowEmployees) => {
        this.loadingShow = false;
        this.getListOfRegions(res.data.state_Id);
        this.getListOfJob(res.data.department_Id)
        this.state_id = res.data.state_Id;
        this.department_id = res.data.department_Id;
        this.EmployeeForm.patchValue({
          Code: res.data.code,
          Name: res.data.name,
          NameInEnglish: res.data.nameInEnglish,
          // Email: ,
          Address: res.data.address,
          University: res.data.university,
          Qualification: res.data.qualification,
          // number
          id: res.data.id,
          NationalId: res.data.nationalId,
          Mobile: res.data.mobile,
          Salary: res.data.salary,
          // boolean
          IsDepartmentManager: res.data.isDepartmentManager,
          // DATE
          HireDate: this._FormateDateService.recivedFormateDate(res.data.hireDate),
          GraduateDate: this._FormateDateService.recivedFormateDate(res.data.graduateDate),
          BirthDate: this._FormateDateService.recivedFormateDate(res.data.birthDate),
          // LIST ID
          MilitaryStatus_Id: res.data.militaryStatus_Id,
          MaritalStatus_Id: res.data.maritalStatus_Id,
          Status_Id: res.data.status_Id,
          Region_Id: res.data.region_Id,
          Gender_Id: res.data.gender_Id,
          Job_Id: res.data.job_Id,
          SuperVisor_Id: res.data.superVisor_Id,
          // optional
          state_Id: res.data.state_Id,
          department_Id: res.data.department_Id,
          // FILES
          ImagePath: res.data.imagePath ? `${this.pathUrl +res.data.imagePath}` : "",
          CoverPath: res.data.coverPath ? `${this.pathUrl +res.data.coverPath}` : "",
          Files: res.data.files,
        })
        res.data.files.forEach((ele:any , index:number)=>{
          index > 0 ? this.addFormEmployee() : EMPTY;
          this.Employee.controls[index].patchValue({
            path: `${this.pathUrl + ele.file}`,
            Description: ele.description,
          })
        })
      }, error: (err: Error) => {
        this.loadingShow = false;
      }
    })
  }
  getUpdateEmployee(EmployeeId: number): number {
    this.EmployeeId = EmployeeId;
    return EmployeeId
  }
  EditEmployeeById(): void {
    // this.EmployeeForm.patchValue({
    //   HireDate: this._FormateDateService.sendFormateDate(this.EmployeeForm.get('HireDate').value),
    //   GraduateDate: this._FormateDateService.sendFormateDate(this.EmployeeForm.get('GraduateDate').value),
    //   BirthDate: this._FormateDateService.sendFormateDate(this.EmployeeForm.get('BirthDate').value),
    // })
    let value = this.EmployeeForm.value
    // delete value["ImagePath"];
    // delete value["CoverPath"];
    // delete value["Files"];
    value["HireDate"] = this._FormateDateService.sendFormateDate(this.EmployeeForm.get('HireDate').value);
    value["GraduateDate"] = this._FormateDateService.sendFormateDate(this.EmployeeForm.get('GraduateDate').value);
    value["BirthDate"] = this._FormateDateService.sendFormateDate(this.EmployeeForm.get('BirthDate').value);

    value["ImagePath"] = this.image;
    value["CoverPath"] = this.coverPath;
    value["IsDepartmentManager"] ? value["IsDepartmentManager"] : value["IsDepartmentManager"] = false;
    // value["Files"] = this.files;
    // loop ton sen path
    value['Files'] = [];
    this.Employee.controls.forEach((ele:any)=>{
    value['Files'].push({Description:ele.value.Description,File:ele.value.File})
    })
    value['id'] = this.EmployeeId;
    this._EmployeesService.getEditEmployee(value).subscribe({
      next: (res: Employees) => {
        this.getEmployees();
        this.loadingEmployees = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingEmployees = false;
        this.toastrService.error(err.message);
      }
    })
  }
  AddEmployee(): void {
    // this.EmployeeForm.patchValue({
    //   HireDate: this._FormateDateService.sendFormateDate(this.EmployeeForm.get('HireDate').value),
    //   GraduateDate: this._FormateDateService.sendFormateDate(this.EmployeeForm.get('GraduateDate').value),
    //   BirthDate: this._FormateDateService.sendFormateDate(this.EmployeeForm.get('BirthDate').value),
    // })
    let value = this.EmployeeForm.value
    value["HireDate"] = this._FormateDateService.sendFormateDate(this.EmployeeForm.get('HireDate').value);
    value["GraduateDate"] = this._FormateDateService.sendFormateDate(this.EmployeeForm.get('GraduateDate').value);
    value["BirthDate"] = this._FormateDateService.sendFormateDate(this.EmployeeForm.get('BirthDate').value);
    value["IsDepartmentManager"] ? value["IsDepartmentManager"] : value["IsDepartmentManager"] = false;
    // delete value["ImagePath"];
    // delete value["CoverPath"];
    // delete value["Files"];
    // value["ImagePath"] = this.image;
    // value["CoverPath"] = this.coverPath;
    value["SuperVisor_Id"] = this.listOfEmployees.length > 0 ? this.EmployeeForm.get('SuperVisor_Id').value : 1;
    value['Files'] = [];
    this.Employee.controls.forEach((ele:any)=>{
    value['Files'].push({Description:ele.value.Description,File:ele.value.File})
    })

    this._EmployeesService.addEmployee(value).subscribe({
      next: (res: Employees) => {
        this.getEmployees();
        this.loadingEmployees = false;
        this.modalService.dismissAll();
        this.toastrService.success(res.message);
      }, error: (err: Error) => {
        this.loadingEmployees = false;
        this.toastrService.error(err.message);
      }
    })
  }

  ChangeActiveOrNotEmployee(EmployeeId: number) {
    this._EmployeesService.ChangeActiveOrNotEmployee(EmployeeId).subscribe({
      next: (res: Employees) => {
        this.getEmployees();
        if (res.isActive) {
          this.toastrService.success(res.message);
        } else {
          this.toastrService.warning(res.message);
        }
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
      }
    })
  }
  delete(EmployeeId: number) {
    this._EmployeesService.RemoveEmployee(EmployeeId).subscribe({
      next: (res: Employees) => {
        this.getEmployees();
        this.toastrService.error(res.message);
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
      }
    })
  }
  RemoveImage(id:number){
    this.ListOfId.push(id)
    this.DeleteFileOrMoreOfEmployee();
  }
  DeleteFileOrMoreOfEmployee(){
    this._ProfileService.DeleteFileOrMoreOfEmployee(this.ListOfId).subscribe({
      next:(res:Profile)=>{
        this.ListOfId = [];
        this.toastrService.error(res.message);
      }, error: (err: Error) => {
        this.toastrService.error(err.message);
      }
    })
  }
  onSubmit() {
    this.loadingEmployees = true;
    if (this.lableForm === 0 && this.EmployeeForm.invalid) {
      return
    } else {
      this.submit = true;
      this.lableForm === 0 ? this.AddEmployee() : this.EditEmployeeById();
    }
  }
  get form() {
    return this.EmployeeForm.controls;
  }
}
