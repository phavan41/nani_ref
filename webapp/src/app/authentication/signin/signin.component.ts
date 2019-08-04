import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../auth.service';
import { Router } from '@angular/router';
import { Globals } from '../../globals/global';

declare let toastr;
@Component({
  //selector: 'app-singin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  login: LoginModel = {};
  loading = false;

  constructor(private _service: CommonService,private globals: Globals,  private router: Router) {
  }
  

  ngOnInit() {
    this._service.checkLogin().subscribe((response) => {
      if (response.success) {
        debugger;
        if (response.data.user_roles.indexOf('SuperAdmin') > -1) {
          this.router.navigate(['/superadmin']);
        }
        else if (response.data.user_roles.indexOf('Editor') > -1) {
          this.router.navigate(['/editor']);
        }
         else {
          this.router.navigate(['/account']);
        }
      } else {
		this.globals.account = '';
		this.globals.accountName = '';
	  }
    });
  }
  onSignIn(form: NgForm) {
    if (!form.valid) {
      toastr.warning('Please fill all mandatory details');
      return false;
    }
    this._service.login(this.login).subscribe((response) => {

      if (response.success) {
        this._service.isLoggedIn = true;
        toastr.success('Login Success');
        if (response.data.user_roles.indexOf('SuperAdmin') > -1) {
          this.router.navigate(['/superadmin']);
        }
        else if (response.data.user_roles.indexOf('Editor') > -1) {
          this.router.navigate(['/editor']);
        }
         else {
         this.router.navigate(['/common/accountslist']);
        }
      } else {
        toastr.warning(response.message);
      }
    }, (error) => {
      toastr.warning("Something is wrong", error);
    });

  }


}

export class LoginModel {
  constructor(public Email?: string, public Password?: string, public RememberMe?: boolean, public token?: string) { }
}
