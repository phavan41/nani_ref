import { Injectable,EventEmitter } from '@angular/core';
import { ProfileActionService } from "../services/profileaction.service";
import { Globals } from '../globals/global';
import { AppHelper } from '../apphelper';

declare let toastr;

@Injectable()
export class Helper {
  public profileActionsFetchComplete = new EventEmitter();
  
  constructor(private apphelper:AppHelper,private _profileaction:ProfileActionService, public globals: Globals) {}
  
  getUserProfileAction(){
        this._profileaction.getUserProfileAction().subscribe((response) => {
            if (response.success) {
                this.globals.getprofileaction = response.data;
            } else {
                toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
            }
			if (this.profileActionsFetchComplete){
				this.profileActionsFetchComplete.emit(new Event('myEvent'));
			}
        });
    }
	
	currentTime(){
		if (this.globals && this.globals.currentTimezonedata && this.globals.currentTimezonedata.gmt_offset_mins){
			return moment().utc().add(this.globals.currentTimezonedata.gmt_offset_mins,'minutes');
		}
		else {
			return null;
		}
	}
	
}