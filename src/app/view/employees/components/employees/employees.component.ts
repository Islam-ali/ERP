import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  pathUrl: string = env.url;
  EmployeeForm: FormGroup;
  image: any;
  coverPath:any;
  files:any[]=[];
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
  placement = "top"
  constructor(
    private _formBuilder: FormBuilder,
    private _EmployeesService: EmployeesService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _JobsService:JobsService,
    private _DepartmentsService:DepartmentsService

  ) {
    this.companyID = this._ActivatedRoute.snapshot.params['companyID'];
    this.departmentID = this._ActivatedRoute.snapshot.params['departmentID']!;

    this.EmployeeForm = this._formBuilder.group({
      id: [null,],
      Code: [null,],
      Name: [null, [Validators.required]],
      NameInEnglish: [null, [Validators.required]],
      Email: [null, [Validators.required,Validators.email]],
      Mobile: [null, [Validators.required]],
      NationalId: [null,],
      Address: [null],
      University: [null],
      Qualification: [null],
      Salary: [null, [Validators.required]],
      // 
      IsEmployeeManager: [false],
      // DATE
      HireDate: [null, [Validators.required]],
      GraduateDate: [null],
      BirthDate: [null],
      // LIST
      MilitaryStatus_Id: [null, [Validators.required]],
      MaritalStatus_Id: [null, [Validators.required]],
      Status_Id: [null, [Validators.required]],
      Region_Id: [null, [Validators.required]],
      Gender_Id: [null, [Validators.required]],
      Job_Id: [null, [Validators.required]],
      SuperVisor_Id: [null, [Validators.required]],
      // FILES
      ImagePath: [null,],
      CoverPath: [null,],
      Files: [null,],
    });
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getListsDropdown();
  }
  getListsDropdown(){
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
    this._EmployeesService.ListOfRegions(stateID).subscribe({
      next: (res: Employees) => {
        this.listOfRegion = res.data;
      }
    })
  }
  getListOfGenders(): void {
    this._EmployeesService.ListOfGenders().subscribe({
      next: (res: Employees) => {
        this.listOfGender = res.data;
      }
    })
  }
  getListOfJob(departmentID:number): void {
    this._JobsService.ListOfJob(departmentID).subscribe({
      next: (res: Employees) => {
        this.listOfJob = res.data;
      }
    })
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
  uploadeFiles(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.files = event.target.files.item(0)
      reader.onload = (event: any) => {
        this.EmployeeForm.patchValue({
          Files: event.target.result
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
    this.modalService.open(content, { size: 'xl' });
  }
  patchValueForm(content: any, Factory: any) {
    this.lableForm = 1;
    this.showEmployee(Factory.id)
    this.modalService.open(content);
  }
  showEmployee(EmployeeID: number) {
    this.getUpdateEmployee(EmployeeID)
    this.loadingShow = true;
    this._EmployeesService.getEmployeeById(EmployeeID).subscribe({
      next: (res: ShowEmployees) => {
        this.loadingShow = false;
        this.EmployeeForm.patchValue({
          name: res.data.name,
          nameInEnglish: res.data.nameInEnglish
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
    let value = this.EmployeeForm.value
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
    let value = this.EmployeeForm.value
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
