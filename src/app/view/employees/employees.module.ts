import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { UIModule } from 'app/shared/ui/ui.module';
import { NgbDatepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeesComponent } from './components/employees/employees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    UIModule,
    NgbTooltipModule,
    TranslateModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule
  ]
})
export class EmployeesModule { }
