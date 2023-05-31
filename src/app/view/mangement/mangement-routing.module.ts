import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'user-role', loadChildren: () => import('./user-role/user-role.module').then(m => m.UserRoleModule) },
  { path: 'role', loadChildren: () => import('./role/role.module').then(m => m.RoleModule) },
  { path: 'permissions/:roleId', loadChildren: () => import('./permissions/permissions.module').then(m => m.PermissionsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangementRoutingModule { }
