import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'app/shared/ui/ui.module';
import { NgbDatepickerModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    UIModule,
    NgbDatepickerModule,
    NgbNavModule
  ]
})
export class ProfileModule { }
