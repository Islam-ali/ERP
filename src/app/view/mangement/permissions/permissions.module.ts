import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';
import { TranslateModule } from '@ngx-translate/core';
import { UiSwitchModule } from 'ngx-ui-switch';


@NgModule({
  declarations: [
    PermissionsComponent
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    TranslateModule,
    UiSwitchModule
  ]
})
export class PermissionsModule { }
