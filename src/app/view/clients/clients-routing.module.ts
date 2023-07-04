import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { FormClientComponent } from './components/form-client/form-client.component';

const routes: Routes = [
  {
    path:'',
    component:IndexComponent
  },
  {
    path:'add',
    component:FormClientComponent
  },
  {
    path:'edit/:id',
    component:FormClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
