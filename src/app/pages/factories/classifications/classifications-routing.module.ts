import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationsComponent } from './classifications.component';

const routes: Routes = [
  { path: '', component: ClassificationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassificationsRoutingModule { }
