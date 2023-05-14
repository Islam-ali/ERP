import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./classifications/classifications.module').then(m => m.ClassificationsModule) },
  { path: 'factory/:id', loadChildren: () => import('./factory/factory.module').then(m => m.FactoryModule)},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoriesRoutingModule { }
