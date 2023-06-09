import { CUSTOM_ELEMENTS_SCHEMA ,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './components/tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgApexchartsModule } from 'ng-apexcharts';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DndModule } from 'ngx-drag-drop';
import { NgbDropdownModule, NgbModalModule, NgbDatepickerModule, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../../../../shared/ui/ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { CommentsComponent } from './components/comments/comments.component';
// import { NgxDropzoneModule } from 'ngx-dropzone';
import { MentionsModule } from '@flxng/mentions';
@NgModule({
  declarations: [

    TasksComponent,
     CommentsComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    NgApexchartsModule,
    NgbDatepickerModule,
    NgbModalModule,
    CKEditorModule,
    DndModule,
    NgbDropdownModule,
    TranslateModule,
    NgbModule,
    NgSelectModule,
    DropzoneModule,
    // NgxDropzoneModule
    MentionsModule,
    NgbTooltipModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TasksModule { }
