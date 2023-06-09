import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { IndexComponent } from './components/index/index.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgbDatepickerModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommentsClientComponent } from './components/comments-client/comments-client.component';
import { FormClientComponent } from './components/form-client/form-client.component';
import { DetailsComponent } from './components/details/details.component';



@NgModule({
  declarations: [
    IndexComponent,
    CommentsClientComponent,
    FormClientComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    UiSwitchModule,
    ReactiveFormsModule,
    FormsModule,
    UIModule,
    TranslateModule,
    NgxIntlTelInputModule,
    NgbPaginationModule,
    NgSelectModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbNavModule,
    NgbPaginationModule,
    NgSelectModule,
  ]
})
export class ClientsModule { }
