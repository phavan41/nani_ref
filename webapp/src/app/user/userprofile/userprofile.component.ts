import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {Router, ActivatedRoute} from '@angular/router';

import { Countries } from "../../superadmin/models/countries.model";
import { User } from "../../superadmin/models/user.model";
import { address } from "../../models/address.model";

import { CountryService } from '../../services/countries.service';
import { UserProfileService } from '../../services/userprofile.service';
import { LanguageService} from '../../services/language.service'
import { TimeZoneService } from "../../services/time_zone.service";


import { DropzoneConfig } from '../../mastercomponents/dropzone/dropzone.interfaces';
import { environment } from '../../../environments/environment';
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';
import { languageModel } from '../../models/language.model';

declare let toastr;

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  //#region Properties
  user :User =  new User();
  countries: Countries[] = []
  userpassword: PasswordModel = {};
  Languages = this.globals.languages;
  timezone = []
  router;
	showAChangePwrdPopUP: boolean = false;
	@ViewChild('cpassword') cppopup;
  cppopupwindow: NgbModalRef;
  @ViewChild('f') myfrm;
  config : DropzoneConfig =  new DropzoneConfig();

  //#endregion

  //#region Constructor

    constructor(private apphelper:AppHelper,router: Router, private modalService: NgbModal,private _userprofileservice: UserProfileService,
      private _countryservice: CountryService,private _languageservice : LanguageService,private _timesoneservice: TimeZoneService, private route:ActivatedRoute, public globals: Globals) {
        this.router = router;
       }

    ngOnInit() {
      this.getUserProfile();
      this.getCountries();
      //this.getTimezone();
      this.config.addRemoveLinks = true;
      this.config.url = environment.serviceurl + '/Common/fileuploadtotemp';
      

    }

  //#endregion

  //#region Methods 
  
  getUserProfile() {
    this._userprofileservice.getUserData().subscribe((response) => {
      if (response.success) {
        this.user=response.data;
        if(response.data.address){
          this.user.address=response.data.address;
        }else{
          this.user.address=new address();
        }
      }else {
        toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
      }
    });
  }

  getCountries() {
    this._countryservice.getCountries().subscribe((response) => {
      this.countries = response.data;
    });
  }
  

// getTimezone(){
//    this._timesoneservice.getTimeZones().subscribe((response) => {
//    let gmt_offset_text:any;
//    let country_name:any;
//    let timezoneformate:any;
//    if (response.success) {
//     //this.timezone=response.data;
//     for(let t of response.data){
//     gmt_offset_text = t.gmt_offset_text;
//     country_name = t.country_name;
//     timezoneformate = "("+gmt_offset_text+")"+country_name;
//     let data={"time_zone_id":t.time_zone_id, "timezonedata":timezoneformate}
//     this.timezone.push(data);
//     }
//   } else {
//     this.timezone = 
//   toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
//   }
//   });
//   }

  submitForm(f: NgForm){
      if(this.myfrm.valid){
            this._userprofileservice.upateUser(this.user).subscribe((response) => {
              if (response.success) {
                toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
                this.router.navigate(['../'],{relativeTo:this.route});
              } else {
                toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
              }
            }, (error) => {
              toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
            });
       
        }else{
         this.myfrm.form.markAsTouched();
         toastr.warning(this.globals.switchLanguageValue['FILL_MANDATORY_FIELDS']);
       return false;
       }
  }

  changePassword(){
    if(this.userpassword.newpassword!=this.userpassword.confirmpassword){
      toastr.warning(this.globals.switchLanguageValue['PASSWORD_NOT_MATCH']);
      return false;
    }
        this._userprofileservice.changePassword(this.userpassword).subscribe((response) => {
          if (response.success) {
            toastr.success(this.apphelper.parseMessageFromLanguage(response.message))
            this.togglePopUp()
          } else {
            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
          }
        }, (error) => {
          toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
        });
  }

  
  //#endregion

  //#region Events

   togglePopUp() {
      this.showAChangePwrdPopUP = !this.showAChangePwrdPopUP;
      if (this.showAChangePwrdPopUP){
        this.cppopupwindow = this.modalService.open(this.cppopup, {size: 'lg'});
      } else {
        this.cppopupwindow.close();
      }
    }

    cancelButtonClick(e){
      this.router.navigate(['../'],{relativeTo:this.route});
    }

  //#endregion

}

export class PasswordModel {
  constructor(public oldpassword?: string, public newpassword?: string,public confirmpassword?: string) { }
}
