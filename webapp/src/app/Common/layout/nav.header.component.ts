import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from "../../authentication/auth.service";
import { AppHelper } from '../../apphelper';

declare let toastr;
declare let mLayout: any;
@Component({
    selector: 'app-common-top-nav',
    templateUrl: './nav.header.html',
    //styleUrls: ['./signin.component.css']
})
export class HeaderComponent implements OnInit {
    UserData:any={};
	showLanguageDropDown=false;
    constructor(private _service:CommonService,private apphelper:AppHelper) { 
        
    }

    ngOnInit() {
         this.UserData=this._service.UserData;
     }
	 
	 switchLanguage(id:number){
		this.showLanguageDropDown=false;
		this.apphelper.switchLanguage(id);
	}
 
     onLogout(){
         this.apphelper.userLogOut();
     }

    ngAfterViewInit() {
		if (mLayout){
			mLayout.initHeader();
		}
    }

}
