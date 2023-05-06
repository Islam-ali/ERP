import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { IndexComponent } from './index/index.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    UiSwitchModule,
    ReactiveFormsModule
  ]
})
export class CountriesModule { }
