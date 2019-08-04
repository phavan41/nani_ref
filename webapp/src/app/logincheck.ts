import { CanActivate } from "@angular/router";
import { Injectable } from '@angular/core';
import { CommonService } from './authentication/auth.service'
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { AppHelper } from './apphelper';
import { Globals } from './globals/global';

declare let toastr;
@Injectable()
export class LogginCheckGuard implements CanActivate {
    flag:boolean=false;
    constructor(private _service: CommonService,private router: Router,
		private apphelper:AppHelper, private globals: Globals) { };

    canActivate(a):Observable<boolean>  {
      return  this._service.checkLogin().map((response) => {  
            if (response.success) {
				response.data.user_roles = response.data.user_roles.map(function(x){ return x.toLowerCase() });
				this.globals.currentLang =response.data.setlanguage;
				//this.globals.currentTimezone = response.data.time_zone_id;
				if (a.routeConfig.path == 'common' || a.routeConfig.path == 'master'){
					this.flag=true;
				}
				else if (a.routeConfig.path == 'superadmin' && 
					response.data.user_roles.indexOf(a.routeConfig.path) > -1){
					this.flag=true;
				}
				else if(a.routeConfig.path =='editor' && response.data.user_roles.indexOf(a.routeConfig.path)> -1)
				{
					debugger;
					this.flag=true;
				}
				 else if (a.routeConfig.path == 'account' && 
					(response.data.user_roles.indexOf('admin') > -1 ))
					{
					this.flag=true;
				}
				
                if(this.flag)
                {
					this._service.setUserData(response.data);
					if (!this.globals.switchLanguageValue || Object.keys(this.globals.switchLanguageValue).length == 0){
						this.globals.switchLanguageValue = {};
						this.apphelper.switchLanguage(response.data.setlanguage);
					}
                }
                else{
					if (this.globals.switchLanguageValue && this.globals.switchLanguageValue["NO_ROLE_ACCESS"]){
						toastr.warning(this.globals.switchLanguageValue["NO_ROLE_ACCESS"]);                    
                    } else {
						toastr.warning("You don't have access to this role.");
					}
					this.router.navigate(["/"]);
                }
            }
            else{
                this.router.navigate(["/"]);
            }
            return this.flag;
    })
}
}
