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
import { UserAccountService } from "../../services/useraccount.service";
import { Countries } from "../models/countries.model";
import { accountModel } from "../models/accounts.model";
import { contactModel } from "../models/contact.model";
import { address } from "../models/address.model";
import {search} from "../../models/search.model";
import { CountryService } from '../../services/countries.service';
import { message } from '../../mastercomponents/form/index';
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';
import { AppCommonService } from '../../services/appcommon.service';
import { TimeZoneService } from '../../services/time_zone.service';

declare let toastr;

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html'
})

export class AccountsComponent {

	//#region Properties
	countries: Countries[] = []
	languages=[];
	timezone=[];
	contactaccountModel: object[];
	deletedcontactidinfo = [];
	paging: pagingModel = new pagingModel();
	totalRecords: number;
	showAccountTable: boolean = true;
	showCreateAccount: boolean = false;
	showUpdateAccount: boolean = false;
	showfilterPopUP: boolean = false;
	person: accountModel = new accountModel();
	old: number = null;
	new: number = null;
	accountlist: accountModel[] = [];
	password:any;
	message:string;
	Status = [
		{id:1,name:"Active"},
		{id:0,name:"In Active"}
	];
	download:any;
	url:any;
	@ViewChild('f') myfrm;
	@ViewChild('showsuccesspopup') sspopup;
	ssppopupwindow: NgbModalRef;
	@ViewChild('showfilterpopup') filterpopup;
	filterpopupwindow: NgbModalRef;
	@ViewChild('cd') cd;
	@ViewChild('accountDT') accountDT;
	currency:any = [];
	
	Themes = [
		{ value: "Theme1", name: "Theme 1" },
		{ value: "Theme2", name: "Theme 2" }
	];
	//#endregion

	//#region Constructor
	constructor(private apphelper:AppHelper, private router: Router, private route: ActivatedRoute,
		private _userAccountService: UserAccountService, private countryService: CountryService, private modalService: NgbModal
		,public globals: Globals,private _commonService: AppCommonService,private _timesoneservice: TimeZoneService) {
			//console.log(globals.switchLanguageValue);
	}

	ngOnInit() {
		this.totalRecords = 0;
		this.getCountries();
		this.paging.search.status=[1];
		//this.isdefaultchange(0);
		this.getAllLanguages();
		this.getTimezone();
		this.getAllCurrency();
	}

	//#endregion

	//#region Methods

	selectAccount(id: number) {
		//console.log(id);
	}
	
	deleteAccount(id: number) {
		//console.log(id);
	}

	getAllLanguages(){
        // this._accountservice.getLanguageCodes().subscribe((response) => {
			
        //     if (response.success) {
		// 		this.languages=response.data;

        //     } else {
        //         toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
        //     }
        // });
	}
	
	getAllCurrency(){
        // this._accountservice.getAllCurrency().subscribe((response) => {
			
        //     if (response.success) {
		// 		for(let currencyCountry of response.data){
		// 			//console.log(currencyCountry.currency+' - '+currencyCountry.country);
		// 			let data = {"id":currencyCountry.id,"currency_country":currencyCountry.country+' - '+currencyCountry.currency}
		// 			this.currency.push(data);
		// 		}
		// 		//console.log(this.currency);
		// 		//this.currency=response.data;

        //     } else {
        //         toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
        //     }
        // });
	}
	
	getTimezone(){
        this._timesoneservice.getTimeZones().subscribe((response) => {
			let gmt_offset_text:any;
			let country_name:any;
			let timezoneformate:any;
            if (response.success) {
				//this.timezone=response.data;
				for(let t of response.data){
					gmt_offset_text = t.gmt_offset_text;
					country_name = t.country_name;
					timezoneformate = "("+gmt_offset_text+") "+country_name;
					let data={"time_zone_id":t.time_zone_id, "timezonedata":timezoneformate}
					this.timezone.push(data);
				/* console.log(this.timezone); */
				}
            } else {
                toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
            }
        });
    }

	getAllAccountData(event,search=false,refresh=false) {
		if (this.paging == null)
			this.paging = new pagingModel();
		this.paging.pageSize = event.rows;
		this.paging.page = event.first;
		this.paging.sortBy = event.sortField;
		if (event.sortOrder == 1 || refresh==true) {
			this.paging.sortDirection = "desc";
		}
		else {
			this.paging.sortDirection = "asc";
		}
		if(refresh){
			this.paging.search={};
		}
		// this._accountservice.getAccounts(this.paging).subscribe((response) => {
		// 	//console.log(response);
		// 	if (response.success) {
		// 		this.accountlist = response.data;
		// 		this.totalRecords = response.totalrecords;
		// 		if(search){
		// 			this.closepopup();
		// 		}
				
		// 	}
		// });
	}
	onSearchClicked(event){
		this.accountDT.setFirstPageAndRefreshData();
		this.closepopup();
	}
	downloadAccount(sortBy, sortDirection, export_type, search){
		this.download = {
			sortBy: sortBy,
			sortDirection: sortDirection,
			export_type: export_type,
			search: search
		}
		if(this.download.export_type=='print'){
			// this._accountservice.getDownloadAccount(this.download).subscribe((response) => {
			// 	if (response.success) {
			// 		this.url=response.data;
			// 		var popupWinindow = window.open('', '_blank', 'width=900,height=800,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
			// 		popupWinindow.document.open();
			// 		popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + this.url + '</html>');
			// 		popupWinindow.document.close();
			// 		//toastr.success(response.message, response);
			// 	} else {
			// 		toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
			// 	}
			// }, (error) => {
			// 	toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
			// });
		}
		else{
		// this._accountservice.getDownloadAccount(this.download).subscribe((response) => {
		// 	if (response.success) {
		// 		this.url=response.data;
		// 		this._commonService.downloadFileFromUrl(this.url, this.download.export_type, "AccountsData");
		// 		toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
		// 	} else {
		// 		toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
		// 	}
		// }, (error) => {
		// 	toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
		// });
	}
	}


	getCountries() {
		this.countryService.getCountries().subscribe((response) => {
			this.countries = response.data;
		});
	}
	CopyBusinessDetails() {
		if (this.person.sameasbusiness) {
			this.person.billing_address = this.person.business_address;
		} else {
			this.person.billing_address = new address();
		}
	}
	isdefaultchange(index: number) {
		for (let m of this.person.contactaccountModel){
			m.is_primary = false;
		}
		
		this.person.contactaccountModel[index].is_primary = true;
	}

	addContactInfo(isprimary) {
		let c = new contactModel();
		if (isprimary){
			c.is_primary = true;
		}
		this.person.contactaccountModel.push(c);
	}

	deleteContactInfo(e, i) {
		let id = this.person.contactaccountModel[i].id;
		let rmobj = this.person.contactaccountModel[i];
		let isprimary = rmobj.is_primary;
		
		this.person.contactaccountModel = this.person.contactaccountModel.filter(obj => obj !== rmobj);
		if(this.person.contactaccountModel.length==0){
			this.addContactInfo(true);
		} else if (isprimary){
			this.person.contactaccountModel[0].is_primary = true;
		}
		
		if(id != null)
			this.deletedcontactidinfo.push(id)
	}

	SubmitForm(f: NgForm) {
		f.form.markAsTouched();
		if (f.valid) {
			if(this.person.contactaccountModel.filter(function (element, index) {
  				 return (element.is_primary != null && element.is_primary != false)
 			 }).length>0){

			this.person.contactaccountModel = this.person.contactaccountModel.filter(function (element, index) {
				return (element.email != null)
			});

			if (this.person.id > 0) {
				this.person.deletedcontactidinfo=this.deletedcontactidinfo;
				// this._accountservice.updateAccount(this.person).subscribe((response) => {
				// 	if (response.success) {
				// 		toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
				// 		this.person = new accountModel();
				// 		this.person.contactaccountModel = Array<contactModel>();
				// 		this.toggleCreateAccount(true,false);
				// 		/* this.showCreateAccount = false;
				// 		this.showAccountTable = true  */
				// 		this.showUpdateAccount = false;
				// 	} else {
				// 		toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
				// 	}
				// }, (error) => {
				// 	toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
				// });
			}
			else {
				// this._accountservice.addAcount(this.person).subscribe((response) => {
				// 	if (response.success) {
				// 		//toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
				// 		this.password=response.password;
				// 		this.message=this.apphelper.parseMessageFromLanguage(response.message);
				// 		/* alert(this.message);
				// 		alert(this.password); */
				// 		this.ssppopupwindow = this.modalService.open(this.sspopup, {size: 'sm'});
				// 		this.person = null;
				// 		this.toggleCreateAccount(true,false);
				// 		/* this.showCreateAccount = false;
				// 		this.showAccountTable = true*/
				// 		this.showUpdateAccount = false; 
				// 	} else {
				// 		toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
				// 	}
				// }, (error) => {
				// 	toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
				// });
			}
		}else{
			toastr.warning(this.globals.switchLanguageValue['SELECT_PRIMARY_CONTACT']);
			return false;
			}
		} else {
			f.form.markAsTouched();
			toastr.warning(this.globals.switchLanguageValue['FILL_MANDATORY_FIELDS']);
			return false;
		}
	}
	editAccount(id: number) {
		
		// this._accountservice.getAccountbyid(id).subscribe((response) => {
		// 	if (response.success) {
		// 		this.showUpdateAccount = true;
		// 		this.person = response.data;
		// 		this.person.company_name = response.data.account_name;
		// 		this.person.contactaccountModel = Array<contactModel>();
		// 		this.person.contactaccountModel = response.data.contactaccount_model;
		// 		if(this.person.billing_address==null){
        //             this.person.billing_address = new address();
		// 		}
		// 		if(this.person.business_address==null){
        //             this.person.business_address = new address();
		// 		}
		// 		this.person.id = response.data.id;
		// 		this.person.user_email = response.user_data.user_email;
		// 		this.person.user_firstname = response.user_data.user_firstname;
		// 		this.person.user_lastname = response.user_data.user_lastname;
		// 		this.toggleCreateAccount(false,true);
		// 	}
		// });

	}
	//#endregion

	//#region Events

	toggleCreateAccount(refreshData,isEdit=false) {
		if (!isEdit) {

			this.person = new accountModel();
			this.person.contactaccountModel = Array<contactModel>();
			this.person.contactaccountModel.push(new contactModel());
			this.isdefaultchange(0);
			this.showUpdateAccount=false;
		}
		
		this.showCreateAccount = !this.showCreateAccount;
		this.showAccountTable = !this.showAccountTable;
		//this.showUpdateAccount=!this.showUpdateAccount;
		if (refreshData){
			this.refreshDataTable();
		}
	}

	buttonClick(id:number) {
		// this._accountservice.AccountStatus(id).subscribe((response:any) => {
		// 	if (response.success) {
		// 		toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
		// 	}else{
		// 		toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
		// 	}
		// })
	}

	cancelButtonClick(e) {
		//this.accountModel;
		this.person = null;
		this.myfrm.form.markAsUntouched();
		this.showCreateAccount = false;
		this.showAccountTable = true;
		this.showUpdateAccount = false;
	}

	cancelAllButtonClick(e) {
		this.myfrm.form.markAsUntouched();
		for (let key of Object.keys(this.myfrm.form.controls)) {
			this.myfrm.form.get(key).markAsUntouched();
			this.myfrm.form.get(key).updateValueAndValidity();
		}
	}

	cancelPopup(){
		this.ssppopupwindow.close();
	}

	// closepopup() {
	// 	this.showfilterPopUP = !this.showfilterPopUP;
	// 	if (this.showfilterPopUP){
	// 	  this.filterpopupwindow = this.modalService.open(this.filterpopup, {size: 'lg'});
	// 	} else {
	// 	  this.filterpopupwindow.close();
	// 	  //this.paging.search={};
	// 	}
	//   }
	refreshDataTable(){
		this.accountDT.refreshData();
	}
	  resetSearch() {
		this.accountDT.setFirstPageAndRefreshData();
		this.paging.search={};
		this.getAllAccountData(event,false,false);
		this.closepopup();
		//this.paging.search.status=[1];
	  }

	  closepopup() {
		if (this.cd){
			this.cd.closepopupdt();
		}
		//this.paging.search.status=[1];
	}
	//#endregion
}
