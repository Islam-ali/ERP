import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';

const routes: Routes = [
  {path:'',component:ProjectsComponent},
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
