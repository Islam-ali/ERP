import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsRoutingModule } from './details-routing.module';
import { ViewComponent } from './view/view.component';
import { DetailsComponent } from './details.component';
import { NotesComponent } from './notes/notes.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ActivitylogComponent } from './activitylog/activitylog.component';
import { FormNotesComponent } from './forms/form-notes/form-notes.component';
import { FormAppointmentComponent } from './forms/form-appointment/form-appointment.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'app/shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgbDatepickerModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    ViewComponent,
    NotesComponent,
    AppointmentComponent,
    ActivitylogComponent,
    FormNotesComponent,
    FormAppointmentComponent,
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
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
    NgSelectModule
  ]
})
export class DetailsModule { }
