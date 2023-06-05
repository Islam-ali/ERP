import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';
import { TranslateModule } from '@ngx-translate/core';
import { UiSwitchModule } from 'ngx-ui-switch';
import { SplitPermissionsPipe } from './pipes/split-permissions.pipe';


@NgModule({
  declarations: [
    PermissionsComponent,
    SplitPermissionsPipe
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    TranslateModule,
    UiSwitchModule
  ]
})
export class PermissionsModule { }
