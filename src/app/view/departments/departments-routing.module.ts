import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentsComponent } from './components/departments/departments.component';

const routes: Routes = [
  {path:'',component:DepartmentsComponent},
  // { 
  //   path: ':departmentID/projects',
  //   loadChildren: () => import('../../view/projects/projects.module').then(m => m.ProjectsModule),
  //   // canActivate:[AuthGuard],
  //   // data: { roles: [Role.SuperAdmin , Role.Admin] }
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
