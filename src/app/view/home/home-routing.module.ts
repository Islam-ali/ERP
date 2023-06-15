import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home',pathMatch:'full'},
  {path:'home',component:IndexComponent},
  {path:'company-details/:companyId',component:CompanyDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
