import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { FormProjectComponent } from './components/form-project/form-project.component';

const routes: Routes = [
  {path:'',component:ProjectsComponent},
  {path:'add',component:FormProjectComponent},
  {path:'edit/:ProjectID',component:FormProjectComponent},
  { 
    path: ':projectID/tasks',
    loadChildren: () => import('./module/tasks/tasks.module').then(m => m.TasksModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
