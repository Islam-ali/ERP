import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { Role } from 'app/core/modal/role';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  { path: '', redirectTo: '',pathMatch:'full'},
  { path: '', component: LayoutComponent, loadChildren: () => import('../view/view.module').then(m => m.ViewModule), canActivate: [AuthGuard], },

];
export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
  scrollPositionRestoration: 'top',
  relativeLinkResolution: 'legacy',
};
@NgModule({
  imports: [RouterModule.forRoot(routes , routingConfiguration)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
