import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { UIModule } from 'app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CompaniesComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    UIModule,
    NgSelectModule,
    NgApexchartsModule,
    FormsModule, ReactiveFormsModule ,
    NgbTooltipModule,
    UiSwitchModule,
    TranslateModule

  ]
})
export class CompaniesModule { }
