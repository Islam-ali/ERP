import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingRoutingModule } from './pending-routing.module';
import { PendingComponent } from './pending.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { UIModule } from 'app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    PendingComponent
  ],
  imports: [
    CommonModule,
    PendingRoutingModule,
    UiSwitchModule,
    UIModule,
    TranslateModule
  ]
})
export class PendingModule { }
