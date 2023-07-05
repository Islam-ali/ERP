import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { FormEmployeeComponent } from './components/form-employee/form-employee.component';

const routes: Routes = [
  {path:'',component:EmployeesComponent},
  {path:'add' , component:FormEmployeeComponent},
  {path:'edit/:EmployeeId' , component:FormEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
