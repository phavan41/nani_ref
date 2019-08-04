import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from "../../authentication/auth.service";
import { AppHelper } from '../../apphelper';

declare let toastr;
@Component({
    selector: 'top-nav',
    templateUrl: './nav.header.html',
    //styleUrls: ['./signin.component.css']
})
export class HeaderComponent implements OnInit {
    UserData:any={};
	showLanguageDropDown=false;
    constructor(private apphelper:AppHelper,private _service:CommonService,private router:Router) { 
        
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

}
