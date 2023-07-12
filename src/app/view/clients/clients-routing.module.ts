import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { FormClientComponent } from './components/form-client/form-client.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {
    path:'',
    component:IndexComponent
  },
  {
    path:'add',
    component:FormClientComponent,
    data: {
      title: 'page1',
      breadcrumb: [
        {
          label: 'Page1',
          url: ''
        }
      ]
    },
  },
  {
    path:'edit/:id',
    component:FormClientComponent
  },
  {
    path:'details/:id',
    component:DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
