import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoriesRoutingModule } from './factories-routing.module';
import { IndexComponent } from './index/index.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';


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
    TranslateModule,
    NgxIntlTelInputModule,
    NgbPaginationModule,
    NgSelectModule
  ]
})
export class FactoriesModule { }
