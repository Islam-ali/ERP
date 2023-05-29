import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoleRoutingModule } from './user-role-routing.module';
import { UserRoleComponent } from './user-role.component';
import { TranslateModule } from '@ngx-translate/core';
import { UiSwitchModule } from 'ngx-ui-switch';


@NgModule({
  declarations: [
    UserRoleComponent
  ],
  imports: [
    CommonModule,
    UserRoleRoutingModule,
    TranslateModule,
    UiSwitchModule
  ]
})
export class UserRoleModule { }
