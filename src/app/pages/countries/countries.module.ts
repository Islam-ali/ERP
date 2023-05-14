import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { IndexComponent } from './index/index.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../dashboards/saas/shared/shared.module';
import { UIModule } from "../../shared/ui/ui.module";
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [
        IndexComponent
    ],
    imports: [
        CommonModule,
        CountriesRoutingModule,
        UiSwitchModule,
        ReactiveFormsModule,
        FormsModule,
        UIModule,
        TranslateModule
    ]
})
export class CountriesModule { }
