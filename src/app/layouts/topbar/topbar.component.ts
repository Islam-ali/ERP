import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { environment as env } from '@env/environment';
import * as signalR from '@microsoft/signalr';
import { NotificationsService } from './service/notifications.service';
import { SharedService } from 'app/shared/services/shared.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {

  element;
  cookieValue;
  flagvalue;
  countryName;
  valueset;
  notiLength: number = 0;
  messageNotification: any[] = [];
  loader: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private authService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    public languageService: LanguageService,
    public translate: TranslateService,
    public _cookiesService: CookieService,
    private _NotificationsService: NotificationsService,
    private _SharedService : SharedService
  ) {
  }

  listLang = [
    { text: 'العربية', flag: 'assets/images/flags/1172528.png', lang: 'ar' },
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    // { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    // { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    // { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    // { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];

  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();
  user: any;
  routingNotifications(item: any) {
    console.log(item);
    this._SharedService.isRouteNotification$.next(true)
    switch (item.type) {
      case 'Task':
        this.router.navigate([`/companies/${item.companyId}/projects/${item.projectId}/tasks`], { queryParams: { taskId: item.taskId } })
        break;
      case 'TaskComment':
        this.router.navigate([`/companies/${item.companyId}/projects/${item.projectId}/tasks`], { queryParams: { taskId: item.taskId } })
        break;
      case 'Mention':
        this.router.navigate([`/companies/${item.companyId}/projects/${item.projectId}/tasks`], { queryParams: { taskId: item.taskId } })
        break;
      case 'ClientComment':
        this.router.navigate([`/companies/${item.companyId}/clients`], { queryParams: { clientId: item.taskId } })
        break;
      default:
        break;
    }
  }
  ngOnInit() {
    this.openMobileMenu = false;
    this.element = document.documentElement;
    this.user = JSON.parse(localStorage.getItem('user_ERP'))?.userName
    this.cookieValue = this._cookiesService.get('lang_ERP');
    this.cookieValue = JSON.parse(localStorage.getItem('lang_ERP'))?.lang || 'ar';
    // this.GetNotificationsMessages();
    this.GetNotificationsCount();
    this.connectionSignalR();

    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }

  }
  GetNotificationsMessages() {
    this.loader = true;
    this._NotificationsService.GetNotificationsMessages().subscribe({
      next: (res: any) => {
        this.messageNotification = res.data;
        this.loader = false;
        this.GetNotificationsCount();
      }
    })
  }
  GetNotificationsCount() {
    this._NotificationsService.GetNotificationsCount().subscribe({
      next: (res: any) => {
        this.notiLength = +res.data
      }
    })
  }
  connectionSignalR() {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(env.url + 'notify', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    connection
      .start()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        // return console.log('err', err.toString());
      });

    connection.on('BroadcastMessage', () => {
      this.GetNotificationsCount();
    });
  }
  setLanguage(text: string, lang: string, flag: string) {
    let item = { text: text, lang: lang, flag: flag }
    localStorage.setItem('lang_ERP', JSON.stringify(item))
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    if (lang == 'ar') {
      this.document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
      this.document.getElementsByTagName("html")[0].classList.add("rtl");
    } else {
      this.document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
      this.document.getElementsByTagName("html")[0].classList.remove("rtl");
      // this.document.getElementsByTagName("html")[0].classList.add("ltr");
    }
    location.reload();
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }


  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    // if (environment.defaultauth === 'firebase') {
    //   this.authService.logout();
    // } else {
    //   this.authFackservice.logout();
    // }
    localStorage.removeItem('user_ERP');
    this.authService.isAuth.next(false)
    location.reload();
    // this.router.navigate(['/account/login']);
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
}
