import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { DataTableModule } from '../../mastercomponents/ngbcomponents/datatable/datatable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { User } from '../../superadmin/models/user.model';
import { UserAccountService } from '../../services/useraccount.service';
import { Countries } from '../../superadmin/models/countries.model';
import { Roles } from '../../superadmin/models/roles.model';
import { accountModel } from '../../superadmin/models/accounts.model';
import { Subscription } from 'rxjs/Subscription';
import { UserAccounts } from '../../superadmin/models/useraccounts.model';
import { Result } from '../../superadmin/models/response.model';
import { address } from '../../models/address.model';
import { CountryService } from '../../services/countries.service';
import {search} from '../../models/search.model';
import {businessGroup} from "../../models/businessgroup.model";
import {profile} from "../../models/profile.model";
import { DropzoneConfig } from '../../mastercomponents/dropzone/dropzone.interfaces';
import { environment } from '../../../environments/environment';
import { AppCommonService } from '../../services/appcommon.service';
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';
import { businessUnit } from '../../models/businessunit.model';
import { CommonService } from '../../authentication/auth.service';
import { SettingsService } from "../../services/settings.service";

declare let toastr;

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html'
})
export class UsersComponent {

    //#region Properties
    users: User[] = [];
    countries: Countries[] = [];
    roles: Roles[] = [];
    allRoles: Roles[] = [];
	profiles: profile[] = [];
    user: User = new User();
    totalRecords: number = 0;
    message:any;
	paging: pagingModel = new pagingModel();
    showfilterPopUP: boolean = false;
    showUserTable: boolean = true;
    showCreateUser: boolean = false;
    showUpdateUser: boolean = false;
    config : DropzoneConfig =  new DropzoneConfig();
    download:any;
    url:any;
    Status = [
        {id: "1", name: "Active"},
        {id: "0", name: "In-Active"}
      ];
      @ViewChild('cd') cd;
      @ViewChild('f') myform;
      @ViewChild('showsuccesspopup') sspopup;
      ssppopupwindow: NgbModalRef;
      @ViewChild('showfilterpopup') filterpopup;
      filterpopupwindow: NgbModalRef;
      page:any;
      @ViewChild('usersSuperAdminDT') usersSuperAdminDT;
	  @ViewChild('usersAdminDT') usersAdminDT;
      businessUnits: businessUnit[] = [];
      businessUnit:any[] = [];
      is_bgall:boolean =  false;
	  UserData:any ={};
      isAdmin:boolean = false;
      @ViewChild('cofirmPopup') cofirmDailogPopup;
    cofirmDailogPopupwindow: NgbModalRef;
    @ViewChild('showdeleteUser') showdeleteUserPopup;
	showdeleteUserPopupwindow: NgbModalRef;
	setAutoComplete="new-password";
	businessGroupList = [];
    role_list:any [] = [{id:1, role_name:'Admin'},
        {id:2, role_name:'Driver'}]
    //#endregion

    //#region Constructor
    
    constructor(private apphelper:AppHelper,private router: Router,
        private route: ActivatedRoute,
        private userAccountService: UserAccountService,
        private countryService: CountryService, private modalService: NgbModal,
        private _commonService: AppCommonService,public globals: Globals,private authService:CommonService,private settingservice: SettingsService
        //private util :Util
    ) {
        //console.log('Users Component');
        this.route.data.subscribe((params:any) => {
            this.page = params.data;
          });
        
    }

    ngOnInit() {
        this.UserData=this.authService.UserData;
		
		if (this.UserData && this.UserData.user_roles && (this.UserData.user_roles.find(x => x === "Admin") != undefined || this.UserData.user_roles.find(x => x === "admin") != undefined)){
			this.isAdmin = true;
		}
		
        //this.paging.search.status=[1];
        this.getRoles();
        this.getAllRoles();
        this.getRolesForAdmin();
        this.profileList();
		this.config.addRemoveLinks = true;
        this.config.url = environment.serviceurl + '/Common/fileuploadtotemp';
        
    }

    //#endregion

    //#region Events

    // Hiding the Accounts and Roles
    
    getRolesForAdmin(){
        this.userAccountService.getRolesForAdmin().subscribe((response) => {
            if (response.success) {
                this.role_list = response.data;
            } else {
                toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
            }
        }, (error) => {
            toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
        });
    }
    selectedAllBusinessGroups(is_bgall:boolean){
        //debugger
       // console.log("Checkbox clicked ==  "+is_bgall);
        if(is_bgall){
            this.user.is_bgall = -1;
            this.user.business_group_id = [];
            this.user.business_unit_id = [];
           // console.log("is_bgall == "+this.user.is_bgall);
        }else{
            this.user.is_bgall = null;
           // console.log("is_bgall == "+this.user.is_bgall);
        }
    }
	
	getBusinessGroupsTree(){
		this.settingservice.getBusinessGroupsTree().subscribe((response)=>{
          if(response.success){
              this.businessGroupList=response.data;
          }else {
            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
          }
        }, (error) => {
          toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
        });
    }
    driver_list:any[] = [];
	onBusinessGroupChanged(){
        debugger;
        console.log(this.user.business_group_id);
        
        this.getDriverList();
    }
    getDriverList(){
        let data:any ={};
        if(this.user.business_group_id.length > 0){
             data = {"business_group_ids":this.user.business_group_id,"user_id":this.user.id}
           
        }else{
            data = {"business_group_ids":null,"user_id":this.user.id}
        }
        this.settingservice.getDriverList(data).subscribe((response)=>{
            if(response.success){
                this.driver_list=response.data;
            }else {
              //toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
            }
          }, (error) => {
            //toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
          });
       
    }
	/* onBusinessGroupChanged(){
        
        this.getBusinessUnitsList(this.user.business_group_id);
    } */
    /* getBusinessUnitsList(groupid:any) {
        let business_group_id = groupid;
        this.businessUnits=[];
    if(groupid == null){
      business_group_id = [];
    }else{
      business_group_id = groupid;
    } 
		
		this.userAccountService.getBusinessUnitListForAdmin({business_group_id:business_group_id}).subscribe((response) => {
            if (response.success) {
            this.businessUnits = response.data;
            }else {
                toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
            }
        }, (error) => {
            toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
        })
	} */
    toggleCreateUser(updateUser,refreshData) {
		this.getCountries();
		
        this.showUserTable = !this.showUserTable;
		
		if (updateUser) {
			this.showUpdateUser=!this.showUpdateUser;
		} else {
            this.is_bgall = false;
			this.showCreateUser = !this.showCreateUser;
		}
        this.user = new User();
        this.user.userAccounts = [{ account_id: null, role_id: null }];
        if (refreshData){
            this.refreshDataTable();
        }
    }

    accountRoleSelected(index) {
        if (index == this.user.userAccounts.length - 1) {
            if (this.user.userAccounts[index].account_id != null && this.user.userAccounts[index].role_id != null) {
                this.user.userAccounts.push(new UserAccounts());
            }
        }
    }

    //#endregion
    downloadUser(sortBy, sortDirection1, export_type, search1,adminOrSuperadmin) {
		this.download = {
			sortBy: sortBy,
			sortDirection: sortDirection1,
			export_type: export_type,
			search: search1
		}
        if(adminOrSuperadmin=='superadmin'){
            if(this.download.export_type=='print'){
                this.userAccountService.getDownloadSuperAdminUser(this.download).subscribe((response) => {
                    if (response.success) {
                        this.url=response.data;
                        var popupWinindow = window.open('', '_blank', 'width=900,height=800,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                        popupWinindow.document.open();
                        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + this.url + '</html>');
                        popupWinindow.document.close();
                       //toastr.success(response.message, response);
                    } else {
                        toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
                    }
                }, (error) => {
                    toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
                });
            }
            else{
            this.userAccountService. getDownloadSuperAdminUser(this.download).subscribe((response) => {
                if (response.success) {
                    this.url=response.data;
                    this._commonService.downloadFileFromUrl(this.url, this.download.export_type, "UserData");
                    toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
                } else {
                    toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
                }
            }, (error) => {
                toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
            });
        }
        }
        else{
            if(this.download.export_type=='print'){
                this.userAccountService.getDownloadAdminUser(this.download).subscribe((response) => {
                    if (response.success) {
                        this.url=response.data;
                        var popupWinindow = window.open('', '_blank', 'width=900,height=800,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                        popupWinindow.document.open();
                        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + this.url + '</html>');
                        popupWinindow.document.close();
                       // toastr.success(response.message, response);
                    } else {
                        toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
                    }
                }, (error) => {
                    toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
                });
            }
            else{
            this.userAccountService.getDownloadAdminUser(this.download).subscribe((response) => {
                if (response.success) {
                    this.url=response.data;
                    this._commonService.downloadFileFromUrl(this.url, this.download.export_type, "UserData");
                    toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
                } else {
                    toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
                }
            }, (error) => {
                toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
            });
        }
        }
		
		
	}

    //#region Methods

    submitForm(form: NgForm) {
        form.form.markAsTouched();
        if (form.valid) {
            if (this.user.id > 0) {
                if(this.page == 'superadmin'){
                    if(this.user.userAccounts!=undefined){
                        this.user.userAccounts = this.user.userAccounts.filter(function (element, index) {
                            return (element.account_id != null && element.role_id != null)
                        });
                    }
                    
                    this.user.userAccounts = this.user.is_superadmin ? [] : this.user.userAccounts;
                this.userAccountService.upateUser(this.user).subscribe(
                    (response) => {
                        if (response.success) {
                            toastr.success(this.apphelper.parseMessageFromLanguage(response.message))
                            this.toggleCreateUser(true,true);
                        }
                        else {
                            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
                        }
                    }, (error) => {
                        toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
                    }
                )
            }else{
                this.userAccountService.AdminUpateUser(this.user).subscribe(
                    (response) => {
                        if (response.success) {
                            toastr.success(this.apphelper.parseMessageFromLanguage(response.message))
                            this.toggleCreateUser(true,true);
                        }
                        else {
                            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
                        }
                    }, (error) => {
                        toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
                    }
                )
            }
            }
            else {
                if(this.page == 'superadmin'){
                    this.user.userAccounts = this.user.userAccounts.filter(function (element, index) {
                        return (element.account_id != null && element.role_id != null)
                    });
                    this.user.userAccounts = this.user.is_superadmin ? [] : this.user.userAccounts;
                this.userAccountService.addUser(this.user).subscribe(
                    (response) => {
                        if (response.success) {
                            toastr.success(this.apphelper.parseMessageFromLanguage(response.message))
                            this.toggleCreateUser(false,true);
                        }
                        else {
                            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
                        }
                    }, (error) => {
                        toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
                    }
                )
            }else{
                this.userAccountService.addAdminUser(this.user).subscribe(
                    (response) => {
                        if (response.success) {
                            toastr.success(this.apphelper.parseMessageFromLanguage(response.message))
                            this.toggleCreateUser(false,true);
                        }
                        else {
                            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
                        }
                    }, (error) => {
                        toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
                    }
                )
            }
            }

        }
        else {
            form.form.markAsTouched();
            toastr.warning(this.globals.switchLanguageValue['FILL_MANDATORY_FIELDS']);
            return false;
        }
    }



    editUser(id: number) {
        //console.log(id);
        if(this.page == 'superadmin'){
        this.userAccountService.getUserById(id).subscribe((response) => {
            if (response.success) {
                this.user = response.data;
                if (this.user.address == null) {
                    this.user.address = new address();
                }
                this.showUserTable = false;
                this.showUpdateUser = true;
                //this.user.is_superadmin  = this.user.userAccounts.length == 0;
                //this.user.is_superadmin  = this.user.userAccounts == undefined ? true : false;
                if (this.user.userAccounts){
					this.user.userAccounts.push({ account_id: null, role_id: null });
				} else {
					this.user.userAccounts = [{ account_id: null, role_id: null }];
				}
            }
        });
    }else{
        this.userAccountService.getAdminUserById(id).subscribe((response) => {
            if (response.success) {
                //debugger;
                this.user = response.data;
                this.businessUnit = response.data.business_unit_id;
                if(response.data.is_bgall == -1){
                    this.is_bgall = true;
                }else{
                    this.is_bgall = false;
                    /* this.getBusinessUnitsList(this.bussiness_group); */
                }
                /* this.getDriverList(); */
                //console.log(this.user.business_unit_id);
                //console.log(this.businessUnit);
                if (this.user.address == null) {
                    this.user.address = new address();
                }
                this.showUserTable = false;
                this.showUpdateUser = true;
				//this.user.is_superadmin  = this.user.userAccounts.length == 0;
                if (this.user.userAccounts){
					this.user.userAccounts.push({ account_id: null, role_id: null });
				} else {
					this.user.userAccounts = [{ account_id: null, role_id: null }];
				}
            }
        });
    }
    }

    getAllUsers(event,search=false,refresh=false) {
        //this.closepopup();
        if (this.paging == null)
            this.paging = new pagingModel();
        this.paging.pageSize = event.rows;
        this.paging.page = event.first;
        this.paging.sortBy = event.sortField;
        if (event.sortOrder == 1 || refresh == true) {
            this.paging.sortDirection = "desc";
        }
        else {
            this.paging.sortDirection = "asc";
        }
        /* if(refresh){
			this.paging.search={};
		} */
        if(this.page == 'superadmin'){
            if(refresh){
                this.paging.search={};
            } 
        this.userAccountService.getUsersGrid(this.paging).subscribe((response: Result) => {
            if(response.success){
            this.users = response.data;
            this.totalRecords = response.totalrecords;
            if(search){
                this.closepopup();  
            }
          
         }
         this.closepopup();  
         if(refresh){
			this.paging.search={};
		} 
        });
    }else{
        if(refresh){
			this.paging.search={};
		}
        this.userAccountService.getAdminUsersGrid(this.paging).subscribe((response: Result) => {
            if(response.success){
            this.users = response.data;
            this.totalRecords = response.totalrecords;
            if(search){
                this.closepopup();
            }
         }
         this.closepopup();
           
        });
        
    }
    }

    onSearchClicked(event){
		if (this.page == 'superadmin'){
			this.usersSuperAdminDT.setFirstPageAndRefreshData();
		} else {
			this.usersAdminDT.setFirstPageAndRefreshData();
		}
		this.closepopup();
    }
    refreshDataTable(){
        if (this.page == 'superadmin'){
			this.usersSuperAdminDT.refreshData();
		} else {
			this.usersAdminDT.refreshData();
		}
    }
    getCountries() {
		if (this.countries.length <= 0){
			this.countryService.getCountries().subscribe((response: Result) => {
				this.countries = response.data;
				for (let country of this.countries) {
					country.text = country.name;
					country.value = country.id;
				}
			});
		}
    }

   
	profileList() {
        this.userAccountService.profileList().subscribe((response: Result) => {
            this.profiles = response.data;

            
        })
    }
	
	getRoles() {
        this.userAccountService.getRoles().subscribe((response: Result) => {
            // this.roles = this.util.convertToDropdownClass(response.data,"name","id");
            this.roles = response.data;
            for (let role of this.roles) {
                role.text = role.name;
                role.value = role.id;
            }

        })
    }
    getAllRoles() {
        this.userAccountService.getAllRoles().subscribe((response: Result) => {
            // this.roles = this.util.convertToDropdownClass(response.data,"name","id");
            this.allRoles = response.data;
            for (let role of this.roles) {
                role.text = role.name;
                role.value = role.id;
            }

        });
    }

    resetSearch(){
        this.paging.search={};
		if (this.page == 'superadmin'){
			this.usersSuperAdminDT.setFirstPageAndRefreshData();
		} else {
			this.usersAdminDT.setFirstPageAndRefreshData();
		}
        this.getAllUsers(event,false, false);
        this.closepopup();
       
    }
    
    Restpassword(id: number) {
        if(this.page=='superadmin'){
			if (confirm("Are you sure reset the password") == true){
				this.userAccountService.resetpwd(id).subscribe((response: Result) => {
					this.message=this.apphelper.parseMessageFromLanguage(response.message);
					this.ssppopupwindow = this.modalService.open(this.sspopup, {size: 'sm'});
				});
			}
		}else{
			if (confirm("Are you sure reset the password") == true) {
				this.userAccountService.resetAdminpwd(id).subscribe((response: Result) => {
					this.message=this.apphelper.parseMessageFromLanguage(response.message);
					this.ssppopupwindow = this.modalService.open(this.sspopup, {size: 'sm'});
				});
			}
		}
    }
    //togglePopUp() {
	//	this.showfilterPopUP = !this.showfilterPopUP;
	//	if (this.showfilterPopUP){
	//	  this.filterpopupwindow = this.modalService.open(this.filterpopup, {size: 'lg'});
	//	} else {
            
	//	  this.filterpopupwindow.close();
	//	}
	//  }
     
      cancelPopup(){
        this.ssppopupwindow.close();
       }
       AdminStatusChange(id:number) {
		//alert("Button Click Event");
		this.userAccountService.UserAdminStatus(id).subscribe((response:any) => {
			if (response.success) {
				toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
			}else{
				toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
			}
		})
    }
    SuperadminStatusChange(id:number) {
		//alert("Button Click Event");
		this.userAccountService.UserSuperadminStatus(id).subscribe((response:any) => {
			if (response.success) {
				toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
			}else{
				toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
			}
		})
    }
    closepopup() {
        if (this.cd){
         this.cd.closepopupdt();
        
        }
        
       }
    id:number;
    openConfirmPopup(id:number){
		//debugger;
		this.id = id;
		this.cofirmDailogPopupwindow = this.modalService.open(this.cofirmDailogPopup, {backdrop : 'static', keyboard : true});
    }
    onConfirmClickded(action_type:string){
		if(action_type == 'Yes'){
		  this.cofirmDailogPopupwindow.close();
		  this.showdeleteUserPopupwindow = this.modalService.open(this.showdeleteUserPopup, {backdrop : 'static', keyboard : true});
		}else{
		  this.cofirmDailogPopupwindow.close();
		}
	}
	clancelConfirmPopup(){
			this.showdeleteUserPopupwindow.close();
    }
    confirmToDeleteUserById(id:number){
       // debugger;
      if(id !== null && id > 0){
          this.userAccountService
          .deleteSuperadminUserById(id)
          .subscribe((response: any) => {
              if (response.success) {
                  toastr.success(
                      this.apphelper.parseMessageFromLanguage(response.message)
                  );
                  this.refreshDataTable();
                  this.showdeleteUserPopupwindow.close();
              } else {
                  toastr.warning(
                      this.apphelper.parseMessageFromLanguage(response.message)
                  );
                  
              }
          });
      }
    }
    //#endregion

}

