import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { Role } from 'app/core/modal/role';

const routes: Routes = [
  { path: '', redirectTo: 'home',pathMatch:'full'},
  {
    path: 'home',
    loadChildren: () => import('../view/home/home.module').then(m => m.HomeModule),
    canActivate:[AuthGuard],
    data: { roles: [Role.SuperAdmin , Role.Admin , Role.User , Role.DepartmentAdmin]}
  },
  { 
    path: 'companies',
    loadChildren: () => import('../view/companies/companies.module').then(m => m.CompaniesModule),
    canActivate:[AuthGuard],
    data: { roles: [Role.SuperAdmin , Role.Admin , Role.DepartmentAdmin] }
  },
  { 
    path: 'companies/:companyID/departments/:departmentID/projects',
    loadChildren: () => import('../view/projects/projects.module').then(m => m.ProjectsModule),
  },
  { 
    path: 'mangement',
    loadChildren: () => import('../view/mangement/mangement.module').then(m => m.MangementModule),
    canActivate:[AuthGuard],
    data: { roles: [Role.SuperAdmin] }
  },
  { 
    path: 'profile',
    loadChildren: () => import('../view/profile/profile.module').then(m => m.ProfileModule),
    canActivate:[AuthGuard]
  },
  { 
    path: 'clients',
    loadChildren: () => import('../view/clients/clients.module').then(m => m.ClientsModule),
    canActivate:[AuthGuard],
    data: { roles: [Role.SuperAdmin] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
