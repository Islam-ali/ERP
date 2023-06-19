import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, OnChanges, OnDestroy } from '@angular/core';
import MetisMenu from 'metismenujs/dist/metismenujs';
import { EventService } from '../../core/services/event.service';
import { Router, NavigationEnd } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'app/core/services/auth.service';
import { CompaniesService } from 'app/view/companies/companies.service';
import { promise } from 'protractor';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

/**
 * Sidebar component
 */
export class SidebarComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('componentRef') scrollRef;
  @Input() isCondensed = false;
  menu: any;
  data: any;
  companyIds: any[] = [];
  menuItems = [];
  loadingCompany: boolean = false;
  @ViewChild('sideMenu') sideMenu: ElementRef;
  USERERP: any;
  constructor(private _CompaniesService: CompaniesService,
    private eventService: EventService,
    public router: Router,
    public translate: TranslateService,
    private http: HttpClient,
    public _AuthenticationService: AuthenticationService,
    private _SharedService: SharedService
  ) {
    this.USERERP = JSON.parse(localStorage.getItem('user_ERP'));

    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
        this._scrollElement();
      }
    });
  }

  ngOnInit() {
    this._SharedService.isReloadeCompany.subscribe(res => {
      if (res) this.GetCompanyOrThroughToken();

    })

    // if (this.USERERP.company_Id == 0) {
    this.GetCompanyOrThroughToken();
    // } else {
    //   this.initialize();
    // }
    this._scrollElement();

  }

  // ngAfterViewInit() {
  //   this.menu = new MetisMenu(this.sideMenu.nativeElement);
  //   this._activateMenuDropdown();
  // }
  _MetisMenu() {
    this.menu = new MetisMenu(this.sideMenu.nativeElement);
    this._activateMenuDropdown();
  }
  toggleMenu(event) {
    event.currentTarget.nextElementSibling.classList.toggle('mm-show');
  }

  ngOnChanges() {
    if (!this.isCondensed && this.sideMenu || this.isCondensed) {
      setTimeout(() => {
        this.menu = new MetisMenu(this.sideMenu.nativeElement);
      });
    } else if (this.menu) {
      this.menu.dispose();
    }
  }
  checkRouting(route: string) :boolean {
  let check = route !== undefined ? this.router.url.includes(route) : false;
    return true ;
  }
  GetCompanyOrThroughToken() {
    this._CompaniesService.GetCompanyOrThroughToken().subscribe({
      next: (res: any) => {
        this.companyIds = res.data;
        this.initialize();
        this.loadingCompany = true
      }
    })
  }
  _scrollElement() {
    setTimeout(() => {
      if (document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition = document.getElementsByClassName("mm-active")[0]['offsetTop'];
        if (currentPosition > 500)
          if (this.scrollRef.SimpleBar !== null)
            this.scrollRef.SimpleBar.getScrollElement().scrollTop =
              currentPosition + 300;
      }
    }, 300);
  }
  checkRole(role: string[]) {
    const intersection = role.filter(x => this.USERERP.roleNames.includes(x))
    return intersection
  }
  /**
   * remove active and mm-active class
   */
  _removeAllClass(className) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }

  /**
   * Activate the parent dropdown
   */
  _activateMenuDropdown() {

    // this._removeAllClass('mm-active');
    // this._removeAllClass('mm-show');
    const links = document.getElementsByClassName('side-nav-link-ref');
    let menuItemEl = null;
    // tslint:disable-next-line: prefer-for-of
    const paths = [];
    for (let i = 0; i < links.length; i++) {
      paths.push(links[i]['pathname']);
    }
    var itemIndex = paths.indexOf(window.location.pathname);
    if (itemIndex === -1) {
      const strIndex = window.location.pathname.lastIndexOf('/');
      const item = window.location.pathname.substr(0, strIndex).toString();
      menuItemEl = links[paths.indexOf(item)];
    } else {
      menuItemEl = links[itemIndex];
    }
    if (menuItemEl) {
      menuItemEl.classList.add('active');
      const parentEl = menuItemEl.parentElement;
      if (parentEl) {
        parentEl.classList.add('mm-active');
        const parent2El = parentEl.parentElement.closest('ul');
        if (parent2El && parent2El.id !== 'side-menu') {
          parent2El.classList.add('mm-show');
          const parent3El = parent2El.parentElement;
          if (parent3El && parent3El.id !== 'side-menu') {
            parent3El.classList.add('mm-active');
            const childAnchor = parent3El.querySelector('.has-arrow');
            const childDropdown = parent3El.querySelector('.has-dropdown');
            if (childAnchor) { childAnchor.classList.add('mm-active'); }
            if (childDropdown) { childDropdown.classList.add('mm-active'); }
            const parent4El = parent3El.parentElement;
            if (parent4El && parent4El.id !== 'side-menu') {
              parent4El.classList.add('mm-show');
              const parent5El = parent4El.parentElement;
              if (parent5El && parent5El.id !== 'side-menu') {
                parent5El.classList.add('mm-active');
                const childanchor = parent5El.querySelector('.is-parent');
                if (childanchor && parent5El.id !== 'side-menu') { childanchor.classList.add('mm-active'); }
              }
            }
          }
        }
      }
    }

  }

  /**
   * Initialize
   */
  initialize() {
    this.FetchMenue().then((m: any) => this.menuItems = m).finally(() =>
      setTimeout(() => {
        this._MetisMenu()
      }, 100)
    )
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }
  ngOnDestroy(): void {
    this.USERERP = null
  }
  FetchMenue() {
    const menu: MenuItem[] = [
      {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true,
        role: ['Admin', 'Superadmin', 'User', 'DepartmentAdmin'],
        permission: ''
      },
      {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        link: '/home',
        role: ['Admin', 'Superadmin', 'User', 'DepartmentAdmin'],
        permission: ''
      },
      {
        id: 3,
        isLayout: true,
        role: ['Admin', 'Superadmin', 'User', 'DepartmentAdmin'],
        permission: ''
      },
      {
        id: 4,
        label: 'MENUITEMS.APPS.TEXT',
        isTitle: true,
        role: ['Admin', 'Superadmin', 'User', 'DepartmentAdmin'],
        permission: ''
      },
      {
        id: 5,
        label: 'MENUITEMS.COMPANIES.TEXT',
        icon: 'bx bxs-user-detail',
        role: ['Superadmin', 'ClintAdmin', 'ClientView'],
        permission: 'Permissions.Companies.All',
        subItems: [
          {
            id: 15,
            label: 'MENUITEMS.DASHBOARDS.TEXT',
            link: '/companies',
            role: ['Superadmin'],
            permission: 'Permissions.Auth.All',
          }
        ]
      },
      {
        id: 9,
        label: 'MENUITEMS.MANGEMENT.TEXT',
        icon: 'bx bx-cog',
        role: ['Superadmin'],
        permission: 'Permissions.Auth.All',
        subItems: [
          {
            id: 10,
            label: 'MENUITEMS.MANGEMENT.LIST.USERS',
            link: '/mangement/user-role',
            parentId: 4,
            role: ['Superadmin'],
            permission: 'Permissions.Auth.All',
          },
          {
            id: 11,
            label: 'MENUITEMS.MANGEMENT.LIST.ROLES',
            link: '/mangement/role',
            parentId: 5,
            role: ['Superadmin'],
            permission: 'Permissions.Auth.All',
          },
        ]
      },
      // {
      //   id: 12,
      //   label: 'MENUITEMS.PROJECTS.TEXT',
      //   icon: 'bx bx-briefcase-alt-2',
      //   link: `/companies/${this.USERERP.company_Id}/departments/${this.USERERP.department_Id}/projects`,
      //   role: ['User'],
      //   permission:'Permissions.Projects.All',
      // },
    ];

    // if (this.USERERP.company_Id == 0) {
    this.companyIds.forEach((ele, index) => {
      let companyItem = {
        label: ele.name,
        id: ele.id,
        parentId: index + 222,
        icon: 'bx bx-briefcase-alt-2',
        link: `/companies/${ele.id}`,
        permission: 'Permissions.Companies.All',
        subItems: []
      }
      let items: any[] = [
        {
          id: ele.id + index,
          label: 'MENUITEMS.DEPARTMENTS.TEXT',
          link: `/companies/${ele.id}/departments`,
          parentId: ele.id + index,
          permission: 'Permissions.Departments.All',
        },
        {
          id: ele.id + index + 44,
          label: 'MENUITEMS.PROJECTS.TEXT',
          // link: `/companies/${ele.id}/departments/`,
          parentId: ele.id + index + 33,
          permission: 'Permissions.Departments.All',
          subItems: []
        },
        {
          id: 13,
          label: 'MENUITEMS.EMPLOYEES.TEXT',
          link: `/companies/${ele.id}/employees`,
          parentId: ele.id + index,
          permission: 'Permissions.Employees.All',
        },
        {
          id: 14,
          label: 'MENUITEMS.CLIENTS.TEXT',
          link: `/companies/${ele.id}/clients`,
          parentId: ele.id + index,
          permission: 'Permissions.Clients.All',
        }
      ]
      let ProjectItem:any[] = [];
      ele.companyProjects.forEach((subele, subIndex) => {
        ProjectItem.push({
          label: subele.name,
          id: subele.id,
          parentId: subIndex + 333,
          link: `/companies/${ele.id}/departments/${subele.departmentId}/projects/${subele.id}/tasks`,
          permission: 'Permissions.Departments.All',
        })
      })
      
      menu[4].subItems.push(companyItem);
      menu[4].subItems[index + 1].subItems = items;
      menu[4].subItems[index + 1].subItems[1].subItems = ProjectItem
    })
    // }
    return new Promise((resolve, reject) => {
      resolve(menu)
    })
  }
}

