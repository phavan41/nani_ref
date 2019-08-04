import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {pagingModel} from '../../mastercomponents/shareddata/entities/pagingModel';
import {DataTableModule} from '../../mastercomponents/ngbcomponents/datatable/datatable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { address } from "../../models/address.model";
import { businessUnit } from "../../models/businessunit.model";
import { businessGroup } from "../../models/businessgroup.model";
import { Countries } from "../../superadmin/models/countries.model";
import { VehicleSettingsModel } from "../../models/vehicle_settings.model";
import {SettingsService} from "../../services/settings.service";
import { CountryService } from '../../services/countries.service';
import { VehicleSettingService } from '../../services/vehicle_settings.service';
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';
import { CommonService } from '../../authentication/auth.service';


declare let toastr;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  //#region Properties

    business :businessGroup =  new businessGroup();
    vehiclesettings :VehicleSettingsModel =  new VehicleSettingsModel();
    distancetypes=[];
    BusinessDate=[];
    countries: Countries[] = []
    showCreateGroup: boolean = false;
    showAddGroupPopUP: boolean = false;
    showUpdateBusiness: boolean = false;
    showAddUnitPopUP: boolean=false;
    showUpdateBusinessUnit: boolean=false;
    createVehicleSettings:boolean=false;
    data=[];
    deletedBusinessUnits  = [];
    @ViewChild('f') myfrm;
    @ViewChild('f1') myfrm1;
    @ViewChild('f2') myfrm2;
    @ViewChild('addbg') addbgmodal;
	  @ViewChild('businessunit') bupopup;
    bupopupwindow: NgbModalRef;
    @ViewChild('businessgroup') bgpopup;
	  bgpopupwindow: NgbModalRef;
    UserData:any ={};
    @ViewChild('cofirmPopup') cofirmDailogPopup;
  cofirmDailogPopupwindow: NgbModalRef;
  @ViewChild('deleteBusinessGroup') deleteBusinessGroupPopup;
  deleteBusinessGroupPopupwindow: NgbModalRef;
  businessUnits = [];
  currentBusinessGroupID:number;
  
  @ViewChild('businessUnitsPopup') businessUnitsPopup;
	businessUnitsPopupwindow: NgbModalRef;
  
        
  
 
  
values: number[];
businessGroups_list :any[] = [];
bgselected:string = "2,13";
  //#endregion

  //#region Constructor

    constructor(private apphelper:AppHelper, private router:Router, private route:ActivatedRoute,
		private modalService: NgbModal,
		private _settingservice: SettingsService,private _vehiclesettingservice: VehicleSettingService,
		private countryService: CountryService,public globals: Globals, private _service:CommonService) { }
      
      ngOnInit() {
        this.UserData=this._service.UserData;
        this.getCountries();
        this.getDiatancevalue();
        this.getBusinessGroupsList();
      }
      onFilterChange(value: string) {
        console.log('filter:', value);
    }

  //#endregion

  //#region Methods
  getBusinessGroupsList() {
		this.businessGroups_list=[];
		this._settingservice.getBusinessGroupList().subscribe(
			(response) => {
        if (response.success) {
          this.businessGroups_list = response.data;
        }else {
          toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
        }
			
			}
		)
  }
  getBusinessGroupsTreeViewList() {
		this.businessGroups_list=[];
		this._settingservice.getBusinessGroupsTreeViewList().subscribe(
			(response) => {
        if (response.success) {
          this.businessGroups_list = response.data;
        }else {
          toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
        }
			
			}
		)
	}
    addBusiness(f: NgForm){
        if(f.valid){
            if (this.business.id > 0) {
              this.business.deletedBusinessUnits=this.deletedBusinessUnits;
              this._settingservice.updateBusinessGroup(this.business).subscribe((response) => {
                if (response.success) {
                  this.showUpdateBusiness=true;
                  toastr.success(this.apphelper.parseMessageFromLanguage(response.message))
                  this.business =  new businessGroup();
                  this.business.group_address =  new address();
                  this.business.business_units = Array<businessUnit>();
                  this.closePopup()
                  this.showCreateGroup=false;
                  this.ShowBusinessGroup();
                } else {
                  toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
                }
              }, (error) => {
                toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
              });
          }else{
            
            this._settingservice.addBusinessGroup(this.business).subscribe((response) => {
              if (response.success) {
                this.showUpdateBusiness=false;
                toastr.success(this.apphelper.parseMessageFromLanguage(response.message))
                this.business =  new businessGroup();
                this.business.group_address =  new address();
                this.business.business_units = Array<businessUnit>();
				this.closePopup();
				this.showCreateGroup=false;
                this.getBusinessGroups();
              } else {
                toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
              }
            }, (error) => {
              toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
            });
         }
        }else{
        f.form.markAsTouched();
      toastr.warning(this.globals.switchLanguageValue['FILL_MANDATORY_FIELDS']);
      return false;
      }
    }
	
	showBusinessUnits(group_id:any){
		this.currentBusinessGroupID = group_id;
		this.businessUnits = this.getBusinessUnits(this.BusinessDate,group_id);
		this.businessUnitsPopupwindow = this.modalService.open(this.businessUnitsPopup, {backdrop : 'static', keyboard : true});
	}
	
	getBusinessUnits(list:any,group_id:any){
		let units = [];
		for(let itm of list) {
			if (itm.id == group_id){
				units = itm.business_units;
				break;
			} else if (itm.children && itm.children.length > 0) {
				units = this.getBusinessUnits(itm.children,group_id);
				if (units.length > 0){
					break;
				}
			}
		}
		return units;
	}
	
	closeBusinessUnitsPopup(){
		this.businessUnitsPopupwindow.close();
		this.currentBusinessGroupID = null;
	}
	
    ShowBusinessGroup() {
      
      
        this.getBusinessGroups();
        //this.getCountries();
      
    }
    getBusinessGroups(){
      if(this.globals.getprofileaction.BusinessGroup_View==true){
        this.showCreateGroup = !this.showCreateGroup;
        if(this.showCreateGroup){
        this._settingservice.getBusinessGroupsTree().subscribe((response)=>{
          if(response.success){
              this.BusinessDate=response.data;
			  
			  if (this.currentBusinessGroupID && this.currentBusinessGroupID != null){
				this.businessUnits = this.getBusinessUnits(this.BusinessDate,this.currentBusinessGroupID);
			  }
          }else {
            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
          }
        }, (error) => {
          toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
        });
      }
      }
      else{

        this._settingservice.getBusinessGroups().subscribe((response)=>{
          toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
        });
      }
      
    }
    is_accountAdmin:boolean;
    getIsAccountAdmin(){
      this._settingservice.getIsAccountAdmin().subscribe((response) => {
        if (response.success) {
          this.is_accountAdmin =response.data;
        }else {
          this.is_accountAdmin = false;
          toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
        }
      });
    }
    getCountries() {
      this.countryService.getCountries().subscribe((response) => {
        this.countries = response.data;
      })
    }
    getDiatancevalue(){
      this._vehiclesettingservice.getDiatance().subscribe((response)=>{
        this.distancetypes = response.data;
        //this.distancetypes = parseInt(this.distancetypes)
      })
    }
    edit_mode:boolean=false;
    editBusiness(id: number) {
      debugger;
      this.edit_mode=true;
       this._settingservice.getBusinessByid(id).subscribe((response) => {
        if (response.success) {
          this.business =response.data;
          this.getIsAccountAdmin();
		  if (this.business.group_address == null || this.business.group_address == undefined){
			this.business.group_address =  new address();
		  }
		  
          this.showUpdateBusiness=true;
          this.showAddGroupPopUP=true;
          this.bgpopupwindow = this.modalService.open(this.bgpopup, {size: 'lg',backdrop : 'static', keyboard : true});
        }else {
          toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
        }
      }); 
    }
    
    businessUnitAdd(f1: NgForm){
          if(f1.valid){
                this._settingservice.addBusinessUnit(this.business).subscribe((response) => {
                  if (response.success) {
                    toastr.success(this.apphelper.parseMessageFromLanguage(response.message))
                    this.showUpdateBusinessUnit=false;
                    this.business =  new businessGroup();
                    this.business.group_address =  new address();
                    this.business.business_units = Array<businessUnit>();
                   this.closeUnitPopUp();
					this.showCreateGroup=false;
                    this.getBusinessGroups();
                  } else {
                    toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
                  }
                }, (error) => {
                  toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
                });
            
             }else{
             f1.form.markAsTouched();
             toastr.warning(this.globals.switchLanguageValue['FILL_MANDATORY_FIELDS']);
            return false;
           }
      }
      
      editBusinessUnit(id: number) {
        this._settingservice.getBusinessUnitByid(id).subscribe((response) => {
          if (response.success) {
            this.business.business_units.push(response.data);
            this.showUpdateBusinessUnit=true;
            this.bupopupwindow = this.modalService.open(this.bupopup, {size: 'lg',backdrop : 'static', keyboard : true});
          }else {
            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
          }
        });
      }

      DeleteBusiness(id: number) {
        this._settingservice.deleteBusinessGroup(id).subscribe((response) => {
          if (response.success) {
            toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
            this.showCreateGroup=false;
			this.getBusinessGroups();
          }else {
            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
          }
        });
      }

      DeleteBusinessUnit(id: number) {
        this._settingservice.deleteBusinessUnit(id).subscribe((response) => {
          if (response.success) {
            toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
            this.showCreateGroup=false;
			this.getBusinessGroups();
          }else {
            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
          }
        });
      }

      getSettings(){
          this._vehiclesettingservice.getAllSettings().subscribe((response)=>{
            if(response.success){
                this.vehiclesettings=response.data;
                this.vehiclesettings.distance_type=+(this.vehiclesettings.distance_type);
            }else {
              toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
            }
          }, (error) => {
            toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
          });
      }

      updateVehicleSettings(f2: NgForm){
        if(f2.valid){
          this._vehiclesettingservice.updateSettings(this.vehiclesettings).subscribe((response) => {
                  if (response.success) {
                    toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
                    this.createVehicleSettings = false;
                  } else {
                    toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
                  }
                }, (error) => {
                  toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
                });
            
              }else{
                f2.form.markAsTouched();
                toastr.warning(this.globals.switchLanguageValue['FILL_MANDATORY_FIELDS']);
               return false;
              }
      }

  //#endregion

  //#region Events

  

  addBusinessUnit() {
		this.business.business_units.push(new businessUnit());
	}

	deleteBusinessUnit(e,i) {
    let id = this.business.business_units[i].id;
		let rmobj = this.business.business_units[i];
    this.business.business_units = this.business.business_units.filter(obj => obj !== rmobj);
    if( id != null)
      this.deletedBusinessUnits.push(id)    
  }
  
  togglePopUp() {
    debugger;
    this.getIsAccountAdmin();
    this.showUpdateBusiness= false;
    this.business =  new businessGroup();
    this.showAddGroupPopUP = !this.showAddGroupPopUP;
    if (this.showAddGroupPopUP){
      this.bgpopupwindow = this.modalService.open(this.bgpopup, {size: 'lg',backdrop : 'static', keyboard : true});
    } else {
      this.business =  new businessGroup();
      this.bgpopupwindow.close();
    }
  }
  closePopup(){
    this.business =  new businessGroup();
    this.showAddGroupPopUP = !this.showAddGroupPopUP;
    this.bgpopupwindow.close();
  }
  
  ShowAddBusinessUnit(id:number) {
    this.business.id=id;
    this.showAddUnitPopUP = true;
	  this.bupopupwindow = this.modalService.open(this.bupopup, {size: 'lg',backdrop : 'static', keyboard : true});
    this.addBusinessUnit();
  }

  toggleUnitPopUp() {
    this.showUpdateBusinessUnit=false;
    this.business.business_units = Array<businessUnit>();
    this.showAddUnitPopUP = false;
	  this.bupopupwindow.close();
  }
closeUnitPopUp(){
  this.bupopupwindow.close();
}
  ShowVehicleSettings() {
    this.createVehicleSettings = !this.createVehicleSettings;
    if(this.createVehicleSettings){
      this.getSettings();
     // this.getCountries();
    }
  }
  //#endregion
  id:number;
  openConfirmPopup(id:number){
    if(id != null){
      this.id = id;
		  this.cofirmDailogPopupwindow = this.modalService.open(this.cofirmDailogPopup, {backdrop : 'static', keyboard : true});
    }else{
      this.cofirmDailogPopupwindow.close();
    }
    
	}
	
  confirmTodeleteBusinessGroupById(id: number) {
   // console.log(id);
    debugger;
    if(id != null && id > 0){
      this._settingservice.confirmTodeleteBusinessGroup(id).subscribe((response) => {
        if (response.success) {
          toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
          this.deleteBusinessGroupPopupwindow.close();
        } else {
          toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
          this.deleteBusinessGroupPopupwindow.close();
        }
      }, (error) => {
        toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
        this.deleteBusinessGroupPopupwindow.close();
      });
      
    }
    
  }
  onConfirmClickded(action_type:string){
    if(action_type == 'Yes'){
      this.cofirmDailogPopupwindow.close();
      this.deleteBusinessGroupPopupwindow = this.modalService.open(this.deleteBusinessGroupPopup, {backdrop : 'static', keyboard : true});
    }else{
      this.cofirmDailogPopupwindow.close();
    }
  }
  closeConfirmPopup(){
		this.deleteBusinessGroupPopupwindow.close();
  }

}
