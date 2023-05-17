import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { Role } from 'app/core/modal/role';

const routes: Routes = [
  { path: '', redirectTo: 'companies' },
  { 
    path: 'companies',
    loadChildren: () => import('../view/companies/companies.module').then(m => m.CompaniesModule),
    canActivate:[AuthGuard],
    data: { roles: [Role.SuperAdmin] }
  },
  { 
    path: 'companies/:companyID/departments',
    loadChildren: () => import('../view/departments/departments.module').then(m => m.DepartmentsModule),
    canActivate:[AuthGuard],
    data: { roles: [Role.SuperAdmin , Role.Admin] }
  },
  { 
    path: 'companies/:companyID/employees',
    loadChildren: () => import('../view/employees/employees.module').then(m => m.EmployeesModule),
    canActivate:[AuthGuard],
    data: { roles: [Role.SuperAdmin , Role.Admin] }
  },
  { 
    path: 'companies/:companyID/departments/:departmentID/projects',
    loadChildren: () => import('../view/projects/projects.module').then(m => m.ProjectsModule),
    canActivate:[AuthGuard],
    data: { roles: [Role.SuperAdmin , Role.Admin] }
  },
  { 
    path: 'companies/:companyID/departments/:departmentID/jobs',
    loadChildren: () => import('../view/jobs/jobs.module').then(m => m.JobsModule),
    canActivate:[AuthGuard],
    data: { roles: [Role.SuperAdmin , Role.Admin] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
