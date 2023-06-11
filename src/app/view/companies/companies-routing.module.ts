import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies.component';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { Role } from 'app/core/modal/role';

const routes: Routes = [
  {
    path: '', component: CompaniesComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.SuperAdmin] }
  },
  {
    path: ':companyID/departments',
    loadChildren: () => import('../../view/departments/departments.module').then(m => m.DepartmentsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.SuperAdmin, Role.Admin , Role.DepartmentAdmin] }
  },
  {
    path: ':companyID/employees',
    loadChildren: () => import('../../view/employees/employees.module').then(m => m.EmployeesModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.SuperAdmin, Role.Admin , Role.DepartmentAdmin] }
  },
  {
    path: ':companyID/clients',
    loadChildren: () => import('../../view/clients/clients.module').then(m => m.ClientsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.SuperAdmin, Role.Admin , Role.DepartmentAdmin] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
