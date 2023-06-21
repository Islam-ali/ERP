import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'app/shared/ui/ui.module';
import { NgbDatepickerModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DailyTasksComponent } from './components/profile/daily-tasks/daily-tasks.component';
import { OwnedTasksComponent } from './components/profile/owned-tasks/owned-tasks.component';


@NgModule({
  declarations: [
    ProfileComponent,
    DailyTasksComponent,
    OwnedTasksComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    UIModule,
    NgbDatepickerModule,
    NgbNavModule,
    NgbPaginationModule
  ]
})
export class ProfileModule { }
