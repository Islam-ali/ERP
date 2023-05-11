import { Component , OnInit , Inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './core/services/language.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  constructor(   
     public translate: TranslateService,
     public languageService: LanguageService,
     @Inject(DOCUMENT) private document: any, 
     )
  {    this.translate.setDefaultLang('ar')}
  ngOnInit() {
    let langauge = localStorage.getItem('lang') ? JSON.parse(localStorage.getItem('lang'))?.lang : 'ar'
    if(langauge){
      this.languageService.setLanguage(langauge);
      // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
      if(langauge == 'ar'){
        
        this.document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
        this.document.getElementsByTagName("html")[0].classList.add("rtl");
      }else{
        this.document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
        this.document.getElementsByTagName("html")[0].classList.remove("rtl");
        // this.document.getElementsByTagName("html")[0].classList.add("ltr");
      }
    }
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  }
}
