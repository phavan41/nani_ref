import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable()
export class Globals {
  public account: string = '';
  public switchLanguageValue:any = {};
  public getprofileaction:any;
  public currentLang:number;
  public currentLangName : string = "";
  public languages= [];
  public currentTimezone:number;
  public timezone = [];
  public currentTimezonedata:any = {};
  public accountName:string = '';
  public mapIconTheme:string = '';
  public multiAccount?:number = null;
  public status = [
		{ status: 1, status_name: "Active", language_key:"Status_Active" },
		{ status: 2, status_name: "In Active", language_key:"Status_In_Active" }
	];
  setLanguageName()
    {
        if(this.languages.length > 0)
        {
            let langid  = this.currentLang;
            this.currentLangName = this.languages.filter(function (element, index) {
                return (element.id === langid);
           })[0].language_name;
        }
    }

  setTimezoneData()
  {
        if(this.timezone.length > 0)
        {
            let timezoneid  = this.currentTimezone;
			if (timezoneid != null){
				this.currentTimezonedata = this.timezone.filter(function (element, index) {
					return (element.time_zone_id === timezoneid);
			   })[0];
			   //moment.tz.setDefault(this.currentTimezonedata.time_zone_name);
			}
        }
  }
}
