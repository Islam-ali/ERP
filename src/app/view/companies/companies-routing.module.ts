import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies.component';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { Role } from 'app/core/modal/role';

const routes: Routes = [
  {
    path: '', component: CompaniesComponent,
    canActivate: [AuthGuard],
       data: {permission: ['Permissions.Auth.All']}

    // data: { roles: [Role.SuperAdmin] }
  },
  {
    path: ':companyID/departments',
    loadChildren: () => import('../../view/departments/departments.module').then(m => m.DepartmentsModule),
    canActivate: [AuthGuard],
    data: { permission: ['Permissions.Departments.All'] }
    // data: { roles: [Role.SuperAdmin, Role.Admin , Role.DepartmentAdmin , Role.ClintAdmin] }
  },
  {
    path: ':companyID/employees',
    loadChildren: () => import('../../view/employees/employees.module').then(m => m.EmployeesModule),
    canActivate: [AuthGuard],
    data: { permission: ['Permissions.Employees.All'] }
    // data: { roles: [Role.SuperAdmin, Role.Admin , Role.DepartmentAdmin , Role.ClintAdmin] }
  },
  { 
    path: ':companyID/jobs',
    loadChildren: () => import('../../view/jobs/jobs.module').then(m => m.JobsModule),
    data: {permission: ['Permissions.Jobs.All']}
    // canActivate:[AuthGuard],
    // data: { roles: [Role.SuperAdmin , Role.Admin] }
  },
  {
    path: ':companyID/clients',
    loadChildren: () => import('../../view/clients/clients.module').then(m => m.ClientsModule),
    canActivate: [AuthGuard],
    data: { permission: ['Permissions.Clients.All'] }
    // data: { roles: [Role.SuperAdmin, Role.Admin , Role.DepartmentAdmin , Role.ClintAdmin , Role.ClientView] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
