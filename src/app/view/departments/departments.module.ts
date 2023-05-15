import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './components/departments/departments.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    DepartmentsComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    UiSwitchModule,
    ReactiveFormsModule,
    FormsModule,
    UIModule,
    TranslateModule
  ]
})
export class DepartmentsModule { }
