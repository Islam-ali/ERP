import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoriesRoutingModule } from './factories-routing.module';
import { IndexComponent } from './index/index.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    FactoriesRoutingModule,
    UiSwitchModule,
    ReactiveFormsModule,
    FormsModule,
    UIModule,
    TranslateModule
  ]
})
export class FactoriesModule { }
