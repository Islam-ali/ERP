import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from 'app/pages/invoices/detail/detail.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: DetailComponent,
    children: [
      { path: '', redirectTo: 'xx', pathMatch: 'full' },
      { path: 'xx', component: ViewComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
