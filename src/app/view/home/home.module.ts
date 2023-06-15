import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CompanyDetailsComponent } from './company-details/company-details.component';


@NgModule({
  declarations: [
    IndexComponent,
    CompanyDetailsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule,
    CarouselModule
  ]
})
export class HomeModule { }
