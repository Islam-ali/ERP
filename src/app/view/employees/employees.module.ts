import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { UIModule } from 'app/shared/ui/ui.module';
import { NgbDatepickerModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeesComponent } from './components/employees/employees.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FormEmployeeComponent } from './components/form-employee/form-employee.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    FormEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    UIModule,
    NgbTooltipModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    UiSwitchModule
  ]
})
export class EmployeesModule { }
