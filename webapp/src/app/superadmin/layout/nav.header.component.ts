import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from "../../authentication/auth.service";
import { LanguageService } from "../../services/language.service";
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';


declare let toastr;
declare let mLayout: any;
@Component({
    selector: 'app-top-nav',
    templateUrl: './nav.header.html',
    //styleUrls: ['./signin.component.css']
})
export class HeaderComponent implements OnInit {
    UserData:any={};
    languages=[];
    showLanguageDropDown:boolean=false;
    constructor(private apphelper:AppHelper, private _service:CommonService,private _languageservice:LanguageService,
		private router:Router,public globals: Globals) {
         this.getAllLanguages();
    }

    ngOnInit() {
         this.UserData=this._service.UserData;
		 
			//console.log('Super Admin Header Init');
     }
 
     onLogout(){
         this.apphelper.userLogOut();
     }
	 
	 switchLanguage(id:number){
		this.showLanguageDropDown=false;
		this.apphelper.switchLanguage(id);
	}
     
    getLanguages(){
        this.showLanguageDropDown=!this.showLanguageDropDown
    }

    getAllLanguages(){
        // this._languageservice.getLanguageCodes().subscribe((response) => {
        //     if (response.success) {
        //         this.languages=response.data;
        //     } else {
        //         toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
        //     }
        // });
    }

    ngAfterViewInit() {
		if (mLayout){
			mLayout.initHeader();
		}
    }

}
