import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { DataTableModule } from '../../mastercomponents/ngbcomponents/datatable/datatable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { ProfileActionService } from "../../services/profileaction.service";
import { Result } from '../../superadmin/models/response.model';
import { ProfileActionModel } from "../../models/profileaction.model";
import { PermissionsModel } from "../../models/permissions.model";
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';
import { Helper } from '../helper';

declare let toastr;

@Component({
   //    selector: 'app-profileaction',
    templateUrl: './profileaction.component.html',
    styleUrls: ['./profileaction.component.css'],
})

export class profileActionComponet {

    showAddProfilePopUP: boolean = false;
	@ViewChild('aprofile') addprofile;
	addprofilepopupwindow: NgbModalRef;
    paging: pagingModel;
    profile: ProfileActionModel[] = [];
    @ViewChild('f') myfrm;
    addprofileaction: ProfileActionModel = new ProfileActionModel();
    allProfiles:ProfileActionModel[] = [];
    icon:string ="flaticon-delete";
    constructor(private apphelper:AppHelper, private modalService: NgbModal,private router: Router,
        private route: ActivatedRoute,private _profileactionService: ProfileActionService,
		public globals: Globals, private helper: Helper) {}

    ngOnInit() {
        this.getAllProfiles();
    }

    togglePopUp() {
        this.showAddProfilePopUP = !this.showAddProfilePopUP;
         if (this.showAddProfilePopUP){
            this.addprofilepopupwindow = this.modalService.open(this.addprofile , {size: 'lg'}
            );
         } else {
            this.addprofilepopupwindow.close();
         }
      }

    getprofileaction() {
      //debugger;
        this._profileactionService.getProfileActionList().subscribe((response: Result) => {
            //this.profile = response.data;
            this.profile = this.apphelper.parseDataForLanguage(response.data,"menuname","menuname_language_key");
            this.updateProfilehasaccess(this.profile,this.allProfiles);
            // console.log( this.profile[0].actions_list[0].permissions);
            // console.log( this.profile[0].actions_list[1].permissions);
            // console.log( this.profile[1].actions_list[0].permissions);
            // console.log( this.profile[1].actions_list[1].permissions);
            //this.totalRecords = response.totalrecords;
        });
    }
    updateProfilehasaccess(a,b)
    {
        if(a.length > 0)
        {
            b.forEach(profile => {
                let r =  new Object();
                a.forEach(element => {
                    let count  = 0;
                    if(element.actions_list.length > 0)
                    {
                         element.actions_list.forEach(element1 => {
                        count += element1.permissions.filter(function(z,index){ return z.has_access == false && z.profile_id == profile.id}).length;
                       });
                    }
                    else{
                        count += 1;  
                    }
                    r["a"+profile.id+element.id] = count > 0? false:true;
                });
                profile.hasAccess = r;
            });
            //console.log(b);
        }
    }
    getAllProfiles()
    {
    
        this._profileactionService.getAllProfiles().subscribe((response :Result) => {
            this.allProfiles = response.data;
            this.updateProfilehasaccess(this.profile,this.allProfiles);
        })
    }


    submitForm(f: NgForm){
        try{
          if(f.valid){
                this._profileactionService.addProfile(this.addprofileaction).subscribe((response) => {
                  if (response.success) {
                    toastr.success(this.apphelper.parseMessageFromLanguage(response.message))
                    this.addprofileaction = new ProfileActionModel();
                    this.togglePopUp();
                    this.getAllProfiles();
                    this.getprofileaction();
                  } else {
                    toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
                  }
                }, (error) => {
                  toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
                });
           
            }else{
             f.form.markAsTouched();
             toastr.warning(this.globals.switchLanguageValue['FILL_MANDATORY_FIELDS']);
           
           }
        }
        catch(e){
        }
        return false;
    }
    updateSingleAction(event,id,profile_id,action_id)
    {
        this._profileactionService.getUpdateSingleProfiles({"id":id,"has_access":event.target.checked,"profile_id":profile_id,"action_id":action_id}).subscribe((response :Result) => {
            if (response.success) {
            toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
          // this.profile = response.data;
                //this.getprofileaction();
				//this.helper.getUserProfileAction();
          } else {
            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
          }
        }, (error) => {
          toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
        });
        //console.log(id + " -> " + event.target.checked)
    }
    updateAllAction(event,profile_id,menu_id)
    {
        // console.log(event);
        // console.log(profile_id);
        // console.log(menu_id);
        this._profileactionService.getUpdateAllProfiles({"profile_id":this.allProfiles[profile_id].id,"menu_id":menu_id,"has_access":event.target.checked}).subscribe((response :Result) => {
        if (response.success) {
            toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
            // this.profile = response.data;
                this.getprofileaction();
				this.helper.getUserProfileAction();
           /*for (let a of this.profile.filter( a=>a.id == menu_id)[0].actions_list)
           {
               a.permissions[profile_id].has_access = event.target.checked;
                // console.log(event);
                // console.log(profile_id);
                // console.log(menu_id);
           }*/
          } else {
            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message), response);
          }
        }, (error) => {
          toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
        });
        // console.log(event);
        // console.log(profile_id);
        // console.log(menu_id);
    }
    deleteProfileById(id:number){
        this._profileactionService.deleteProfileById({"profile_id":id}).subscribe((response :Result) => {
            if (response.success) {
            toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
          // this.profile = response.data;
                this. getAllProfiles();
				//this.helper.getUserProfileAction();
          } else {
            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
          }
        }, (error) => {
          toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
        });
    }
}