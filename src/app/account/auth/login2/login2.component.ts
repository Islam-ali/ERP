import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { LoginService } from './login.service';
import { LoginRes } from './login';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'app/core/modal/role';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
/**
 * Login-2 component
 */
export class Login2Component implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _LoginService: LoginService,
    private toastrService: ToastrService,
    private authenticationService: AuthenticationService,
  ) {
  }
  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;
  messageError: any = '';
  // set the currenr year
  year: number = new Date().getFullYear();
  hide: boolean = false;
  ngOnInit(): void {
    // document.body.classList.add('auth-body-bg')
    this.loginForm = this.formBuilder.group({
      userNameOrEmail: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rememberMe: true
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1
      },
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.submitted = false;
      return;
    } else {
      this._LoginService.Login(this.loginForm.value).subscribe({
        next: (res: LoginRes) => {
          this.messageError = '';
          this.submitted = false;
          localStorage.setItem('user_ERP', JSON.stringify(res.data))
          this.router.navigateByUrl('/');
          this.authenticationService.isAuth.next(true);
          // location.reload();
          // switch (currentUser.roleName) {
          //   case Role.Admin:
          //     this.router.navigate(['/companies', currentUser.company_Id]);
          //     break;
          //   case Role.User:
          //     this.router.navigate(['/companies', currentUser.company_Id, 'departments', currentUser.department_Id, 'projects']);
          //     break;
          //   default:
          //     this.router.navigate(['']);
          //     break;
          // }
          // this.router.navigateByUrl('');
          this.toastrService.success(res.message ? res.message : 'تم تسجيل الدخول بنجاح');
        }, error: (err: Error) => {
          this.submitted = false;
          this.messageError = err
        },
      })
    }
  }
}
