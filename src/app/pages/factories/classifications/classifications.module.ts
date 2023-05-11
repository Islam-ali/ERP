import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassificationsRoutingModule } from './classifications-routing.module';
import { ClassificationsComponent } from './classifications.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ClassificationsComponent
  ],
  imports: [
    CommonModule,
    ClassificationsRoutingModule,
    UiSwitchModule,
    ReactiveFormsModule,
    FormsModule,
    UIModule,
    TranslateModule
  ]
})
export class ClassificationsModule { }
