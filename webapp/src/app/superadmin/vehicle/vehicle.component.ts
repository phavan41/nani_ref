import { Component, OnInit, ViewChild, OnDestroy, AfterContentInit } from "@angular/core";
import { businessGroup } from "../../models/businessgroup.model";
import { pagingModel } from "../../mastercomponents/shareddata/entities/pagingModel";
import { AppHelper } from "../../apphelper";
import { VehicleService } from "../../services/vehicle.service";
import { Globals } from "../../globals/global";
import { AppCommonService } from "../../services/appcommon.service";
import { CommonService } from "../../authentication/auth.service";
import { ActivityLogService } from "../../services/activitylog.service";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";

declare let toastr;

@Component({
	selector: "app-vehicle",
	templateUrl: "./vehicle.component.html",
	styleUrls: ["./vehicle.component.css"]
})
export class VehicleComponent implements OnInit, OnDestroy, AfterContentInit {
	vehicleList: any;
	paging: pagingModel = new pagingModel();
	totalRecords: number = 0;
	showTable: boolean = false;
	@ViewChild("cd") cd;
	@ViewChild("vehicleDT") vehicleDT;
	download: any = {};
	data: any;
	url: any;
	showform: boolean = false;
	account_list: any = [];
	account_encrypt_id: any;
	isLocked: boolean = false;
	@ViewChild('showdeleteVehicle') showdeleteVehiclePopup;
	showdeleteVehiclePopupwindow: NgbModalRef;
	Status = [
		{ status: 1, status_name: "Active" },
		{ status: 2, status_name: "In Active" }
	];
	@ViewChild('cofirmPopup') cofirmDailogPopup;
	cofirmDailogPopupwindow: NgbModalRef;
	selectedData:any[] = [];
	showAllVehicles:boolean = false;
	constructor(
		private apphelper: AppHelper,
		private _vehicleService: VehicleService,
		public globals: Globals,
		private _commonService: AppCommonService,
		private _service: CommonService,
		private _accountService: ActivityLogService,
		private modalService: NgbModal
	) { }

	ngOnInit() {
		
		this.getAccounts();
	}
	ngAfterContentInit(){
		//console.log("Selected Data ==  "+this.selectedData);
	}
	getVehicles(event, search = false, refresh = false) {
		debugger;
		if(this.showAllVehicles){
			this.closepopup();
		//console.log("Global account ===  " + this.globals.account);
		
		if (this.paging == null) this.paging = new pagingModel();
		this.paging.pageSize = event.rows;
		this.paging.page = event.first;
		this.paging.sortBy = event.sortField;
		if (event.sortOrder == 1 || refresh == true) {
			this.paging.sortDirection = "desc";
		} else {
			this.paging.sortDirection = "asc";
		}
		if (refresh) {
			this.paging.search = {};
		}
		this._vehicleService
			.getVehicleGrid(this.paging)
			.subscribe((response: any) => {
				if (response.success) {
					this.vehicleList = response.data;
					this.totalRecords = response.totalrecords;
				} else {
					toastr.warning(
						this.apphelper.parseMessageFromLanguage(response.message)
					);
				}
			});
		}else{
			toastr.warning(this.globals.switchLanguageValue["Please_Select_Account"]);
		}
		
	}
	onSearchClicked(event) {
		this.vehicleDT.setFirstPageAndRefreshData();
		if (this.cd) {
			this.cd.closepopupdt();
		}
	}
	resetSearch(event) {
		this.paging.search = {};
		this.vehicleDT.setFirstPageAndRefreshData();
		//this.getVehicles(event,false,false);
		this.closepopup();
	}

	closepopup() {
		//this.paging.search={}
		if (this.cd) {
			this.cd.closepopupdt();
		}
	}
	refreshDataTable(event) {
		//this.getVehicles(event);
		this.vehicleDT.refreshData();
	}
	getAccounts() {
		this._accountService.getAccounts().subscribe(
			(response: any) => {
				if (response.success) {
					this.account_list = response.data;
				} else {
					this.account_list = [];
					toastr.warning(
						this.apphelper.parseMessageFromLanguage(response.message)
					);
				}
			},
			error => {
				toastr.warning(
					this.globals.switchLanguageValue["SOMETHING_WRONG"],
					error
				);
			}
		);
	}
	getAccountEncryptedId(event, id: number) {
		//console.log(id);
		this.account_list.forEach(element => {
			if (element.id == id) {
				//console.log("encrypted id == " + element.account_encrypt_id);
				this.globals.account = element.account_encrypt_id;
				this.showTable = true;
				this.showAllVehicles = true;
				this.getVehicles(event);
				
			} 
		});
	}
	selectChanged(id, status, event) {
		//debugger;
		this._vehicleService
			.statusChanged({ id: id, status: status })
			.subscribe((response: any) => {
				if (response.success) {
					toastr.success(
						this.apphelper.parseMessageFromLanguage(response.message)
					);
				} else {
					toastr.warning(
						this.apphelper.parseMessageFromLanguage(response.message)
					);
					setTimeout(() => {
						this.refreshDataTable(event);
					}, 2000);
				}
			});
	}
	downloadVehicle(sortBy, sortDirection1, export_type, search1) {
		this.download = {
			sortBy: sortBy,
			sortDirection: sortDirection1,
			export_type: export_type,
			search: search1
		};
		if (this.download.export_type == "print") {
			this._vehicleService.getDownloadVehicle(this.download).subscribe(
				response => {
					if (response.success) {
						this.url = response.data;
						var popupWinindow = window.open(
							"",
							"_blank",
							"width=900,height=800,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no"
						);
						popupWinindow.document.open();
						popupWinindow.document.write(
							'<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' +
							this.url +
							"</html>"
						);
						popupWinindow.document.close();
						//toastr.success(response.message, response);
					} else {
						toastr.warning(
							this.apphelper.parseMessageFromLanguage(response.message)
						);
					}
				},
				error => {
					toastr.warning(
						this.globals.switchLanguageValue["SOMETHING_WRONG"],
						error
					);
				}
			);
		} else {
			this._vehicleService.getDownloadVehicle(this.download).subscribe(
				response => {
					if (response.success) {
						this.url = response.data;
						//window.location.href=this.url;
						//window.open(this.url,"_blank");
						this._commonService.downloadFileFromUrl(
							this.url,
							this.download.export_type,
							"VehicleData"
						);
						toastr.success(
							this.apphelper.parseMessageFromLanguage(response.message)
						);
					} else {
						toastr.warning(
							this.apphelper.parseMessageFromLanguage(response.message)
						);
					}
				},
				error => {
					toastr.warning(
						this.globals.switchLanguageValue["SOMETHING_WRONG"],
						error
					);
				}
			);
		}
	}
	id:number;
	openConfirmPopup(id:number){
		debugger;
		this.id = id;
		this.cofirmDailogPopupwindow = this.modalService.open(this.cofirmDailogPopup, {backdrop : 'static', keyboard : true});
	}
	
	
	onConfirmClickded(action_type:string){
		if(action_type == 'Yes'){
		  this.cofirmDailogPopupwindow.close();
		  this.showdeleteVehiclePopupwindow = this.modalService.open(this.showdeleteVehiclePopup, {backdrop : 'static', keyboard : true});
		}else{
		  this.cofirmDailogPopupwindow.close();
		}
	  }
	  clancelConfirmPopup(){
			this.showdeleteVehiclePopupwindow.close();
	  }
	  confirmToDeleteVehicleById(event,id:number){
		  debugger;
		if(id !== null && id > 0){
			this._vehicleService
			.deleteVehicleById(id)
			.subscribe((response: any) => {
				if (response.success) {
					toastr.success(
						this.apphelper.parseMessageFromLanguage(response.message)
					);
					this.refreshDataTable(event);
					this.showdeleteVehiclePopupwindow.close();
				} else {
					toastr.warning(
						this.apphelper.parseMessageFromLanguage(response.message)
					);
					
				}
			});
		}
	  }
	updatedVehicleLock(id: number, isLocked: boolean,event) {
		debugger;
		/* 	this.globals.account = this.account_encrypt_id; */
		if (isLocked == true) {
			this.isLocked = false;
		} else {
			this.isLocked = true;
		}
		let data = { id: id, is_locked: this.isLocked };
		//console.log("update lock dat "+data.id+" "+data.is_locked);
		this._vehicleService.updatedVehicleLock(data).subscribe(
			response => {
				if (response.success) {
					toastr.success(
						this.apphelper.parseMessageFromLanguage(response.message)
					);
					this.refreshDataTable(event);
				} else {
					toastr.warning(
						this.apphelper.parseMessageFromLanguage(response.message)
					);
				}
			},
			error => {
				toastr.warning(
					this.globals.switchLanguageValue["SOMETHING_WRONG"],
					error
				);
			}
		);
	}
	ngOnDestroy() {
		this.globals.account = "";
	}
	
}
