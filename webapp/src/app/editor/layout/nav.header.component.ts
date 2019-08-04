import { Component, OnInit,ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router , ActivatedRoute} from '@angular/router';
import { CommonService } from "../../authentication/auth.service";
import { LanguageService } from "../../services/language.service";
import { TimeZoneService } from "../../services/time_zone.service";
import { ProfileActionService } from "../../services/profileaction.service";
import { NotificationService } from "../../services/notification.service";
import { Notification} from "../../models/Notification.model";
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';

import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare let toastr;
declare let mLayout: any;
@Component({
    selector: 'top-nav',
    templateUrl: './nav.header.html',
    //styleUrls: ['./signin.component.css']
})
export class HeaderComponent implements OnInit {
    UserData:any={};
    timeZones = [];
    showLanguageDropDown:boolean=false;
    showTimeZoneDropDown:boolean = false;
    page:any;
    language_name:string = "";
    notification : Notification = new Notification();
    notifications : Notification[] = [];
    unReadNotifications :number  = 0;
    showNotPopUP:boolean=false;
    @ViewChild('notificationPopup') notPopup;
  notificationPopuppwindow: NgbModalRef;
  showTabIndex: number = 1;
  showNotificationPopup:boolean=false;
  notificationRefreshTimer:any;
  
    constructor(private apphelper:AppHelper, private _service:CommonService,private _languageservice:LanguageService,
		private router:Router,public globals: Globals) { 
        
        // this.getAllTimeZone();
         this.getAllLanguages();
        // helper.getUserProfileAction();
        // this.route.data.subscribe((params:any) => {
        //     this.page = params.data;
        // });
    }
    
    
    ngOnInit() {
    //    this.UserData=this._service.UserData;
	//    this.showLanguageDropDown=false;
	//    if (this.globals.multiAccount == null){
	// 	  // console.log(this.globals.multiAccount);
	// 	this.isMultiUserAccount();
	//    }
    //   //this.getTopNotification();
    //     this.autoRefreshNotification();
    }
	
	ngOnDestroy(){
		if (this.notificationRefreshTimer != null){
			clearTimeout(this.notificationRefreshTimer);
			this.notificationRefreshTimer = null;
		}
	}

    onLogout(){
        //this.apphelper.userLogOut();
    }

    
	
    isMultiUserAccount(){
    //     this._service.isMultiUserAccount().subscribe((response:any)=> {
    //        if(response.success){
    //        this.globals.multiAccount=response.data.count;
    //        }
           
    //    })
   }
   
//    switchLanguage(id:number){
// 		this.showLanguageDropDown=false;
//         this.apphelper.switchLanguage(id);
//     }
    
//     setTimezone(id:number)
//     {
//         this.showTimeZoneDropDown=false;
//         this.apphelper.setTimezone(id);
//     }

//     getLanguages(){
//         this.showLanguageDropDown=!this.showLanguageDropDown;
//     }

//     showTimeZone(){
//         this.showTimeZoneDropDown = !this.showTimeZoneDropDown;
//     }

//     getAllTimeZone()
//     {
//         this._timesoneservice.getTimeZones().subscribe((response) => {
//             if (response.success) {
//                 let gmt_offset_text:any;
//                 let country_name:any;
//                 let timezoneformate:any;
//                 for(let t of response.data){
//                     gmt_offset_text = t.gmt_offset_text;
//                     country_name = t.country_name;
//                     timezoneformate = "("+gmt_offset_text+")"+country_name;
//                     t['time_zone_id'] = t.time_zone_id;
//                     t['timezonedata'] = timezoneformate;
//                     this.globals.timezone.push(t);  
//                     }
//                     this.timeZones = this.globals.timezone;
					
// 					if (this.globals.currentTimezone != null){
// 						this.globals.setTimezoneData();
// 					} else {
// 						this._service.getUserModuleInfo().subscribe((response) => {
// 							if (response.success) {
// 								this.globals.currentTimezone = response.data.time_zone_id;
// 								this.globals.accountName = response.data.account_name;
// 								this.globals.setTimezoneData();
// 							}
// 							else{
// 								toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
// 							}
// 						});
// 					}
//             } else {
//                 toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
//             }
//         });
//     }

    getAllLanguages(){
        // this._languageservice.getLanguageCodes().subscribe((response) => {
        //     if (response.success) {
        //         this.globals.languages=response.data;
        //         this.globals.setLanguageName();
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
    getTopNotification(){
        this.showNotificationPopup=!this.showNotificationPopup;
        
        
    }
	
	autoRefreshNotification(){
		//this.getNotificationsFromServer();
	}
	
	autoRefreshNotificationCompletion(){
		this.notificationRefreshTimer = setTimeout(() => {
				this.autoRefreshNotification();
			}, 300000);
	}
	
	// getNotificationsFromServer(){
	// 	//if(this.showNotificationPopup){
    //         this._notificationService.getTopNotifications().subscribe((response) => {
    //             if (response.success) {
    //                 this.notifications=response.data.data;
    //                 this.unReadNotifications = response.data.TotalRecords;
    //             }
	// 			this.autoRefreshNotificationCompletion();
    //         });
    //    // }
        
    // }

//     resetaccount()
//     {
// 		//console.log("called from");
//         this.globals.accountName = null;
//         this.globals.currentTimezone = null;
//         this.globals.currentLang = null;
//     }
//  viewnotification(id:number)
//   {
//     this.showNotPopUP = true;
//     if (this.showNotPopUP) {
//       this.notificationPopuppwindow = this.modalService.open(this.notPopup, { size: 'lg' });
//       this.notification = this.notifications.find(n => n.id == id);
//     } else {
//       this.notificationPopuppwindow.close();
//     }
//   }

  closeNotification(){
    this.showNotPopUP = false;
    this.notificationPopuppwindow.close();
    this.getTopNotification();
  }

}
