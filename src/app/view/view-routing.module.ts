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
  },
  { 
    path: 'companies',
    loadChildren: () => import('../view/companies/companies.module').then(m => m.CompaniesModule),
    canActivate:[AuthGuard],
    data: { roles: [Role.SuperAdmin , Role.Admin] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
