import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { DataTableModule } from '../../mastercomponents/ngbcomponents/datatable/datatable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { TrackerService } from "../../services/tracker.service";
import { trackerModel,trackerAssignModel } from "../../models/tracker.model";
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';
import { AppCommonService } from '../../services/appcommon.service';


declare let toastr;

@Component({
  selector: 'app-trackers',
  templateUrl: './trackers.component.html',
  styleUrls: ['./trackers.component.css'],
})
export class TrackersComponent implements OnInit {

	//#region Properties

		trackerlist=[];
		manufacturers=[];
		trackerstatus=[];
		trackerstatustmp=[];
		trackertypes=[];
		useraccounts=[];
		bussinessgroup=[];
		busssinessunit=[];
		locations=[];
		trackerHistory={};
		trackerAssignment:trackerAssignModel= new trackerAssignModel();
		tracker: trackerModel = new trackerModel();
		paging: pagingModel = new pagingModel();
		totalRecords: number;
		showfilterPopUP: boolean = false;
		showTrackerAssignPopUP: boolean = false;
		showcreatButton:boolean=true;
		showTrackerGrid:boolean=true;
		showAddTracker: boolean = false;
		showTrackerHistory: boolean = false;
		download:any;
		url:any;
		tracker_id:any;
		@ViewChild('f') myfrm;
		@ViewChild('showfilterpopup') filterpopup;
		filterpopupwindow: NgbModalRef;
		@ViewChild('showhistorypopup') trackerassignpopup;
		trackerassignpopupwindow: NgbModalRef;
		@ViewChild('cd') cd;
		@ViewChild('trackerDT') trackerDT;
		@ViewChild('form') from;
		inputDisabled:boolean=false;
		currentTrackerId:number;
		assignmentChanged:boolean=false;
	//#endregion

	//#region Constructor
		constructor(private apphelper:AppHelper, private modalService: NgbModal,private _trackerservice:TrackerService,
			public globals: Globals, private _commonService: AppCommonService) { }

		ngOnInit() {
			this.totalRecords = 0;
			this.getManufacturers();
			this.getTrackerStatus();
			//this.getTrackerTypes();
			this.getUserAccounts();
		}

	//#endregion
	
	//#region Methods
	getRandomNumber() {
		this._trackerservice.generatedTrackerId().subscribe((response) => {
			this.tracker.tracker_unique_id=response.data.tracker_id;
			this.inputDisabled=true;
		});
	}
	
	onSearchClicked(event){
		this.trackerDT.setFirstPageAndRefreshData();
		this.closepopup();
	}
	
	getTrackerData(event,search=false,refresh=false) {
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
				this._trackerservice.getTrackers(this.paging).subscribe((response) => {
					//console.log(response);
					if (response.success) {
						this.trackerlist = response.data;
						this.totalRecords = response.totalrecords;
						//this.closepopup();
						
					}
				});
			}

			getManufacturers() {
				this._trackerservice.getManufacturers().subscribe((response) => {
					this.manufacturers = response.data;
				});
			}

			getTrackerStatus() {
				this._trackerservice.getTrackerStatus().subscribe((response) => {
					this.trackerstatus = response.data;
					this.trackerstatustmp = response.data;
				});
			}

			getTrackerTypes() {
				this._trackerservice.getTrackerTypes().subscribe((response) => {
					this.trackertypes = response.data;
				});
			}

			getUserAccounts() {
				this._trackerservice.getUserAccounts().subscribe((response) => {
					this.useraccounts = response.data;
				})
			}

			getBusinessGroupsLocations(id:number) {
				this._trackerservice.getBgAndLocations(id).subscribe((response) => {
					this.bussinessgroup = response.data.businessgroups;
					this.locations = response.data.locations;
				});
			}

			getBusinessUnits() {
				this._trackerservice.getBusinessUnits(this.trackerAssignment).subscribe((response) => {
					this.busssinessunit = response.data;
				});
			}

			editTracker(id: number) {
				debugger;
				this._trackerservice.getTrackerbyid(id).subscribe((response) => {
					if (response.success) {
						
						this.tracker = response.data;
						this.getTrackerTypes();
						if (this.tracker.canStatusEdit){
							this.trackerstatustmp = this.trackerstatus.filter(trs => trs.id != 1);
						} else {
							this.trackerstatustmp = this.trackerstatus;
						}
						this.showcreatButton=false;
						this.showTrackerGrid=false;
						this.showAddTracker=true;
					}
				});
			}

			SubmitForm(f: NgForm) {
				if (f.valid) {
					if(this.tracker.id>0){
						this._trackerservice.updateTracker(this.tracker).subscribe((response) => {
							if (response.success) {
								toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
								this.toggleCreateTracker(true);
								this.inputDisabled=false;
							} else {
								toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
							}
						}, (error) => {
							toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
						});
					}else{
						this._trackerservice.addTracker(this.tracker).subscribe((response) => {
							if (response.success) {
								toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
								this.toggleCreateTracker(true);
							} else {
								toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
							}
						}, (error) => {
							toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
						});
					}
				} else {
					f.form.markAsTouched();
					toastr.warning(this.globals.switchLanguageValue['FILL_MANDATORY_FIELDS']);
					return false;
				}
			}

	assignTracker(f:NgForm) {
		f.form.markAsTouched();
		if (f.valid) {
				this._trackerservice.addAccountToTracker(this.trackerAssignment).subscribe((response) => {
					if (response.success) {
						toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
						this.getTrackerHistory(this.trackerAssignment.tracker_id);
						this.toggleTrackerAssignPopUp();
						this.assignmentChanged = true;
					} else {
						toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
					}
				}, (error) => {
					toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
				});
			}
			else{
				f.form.markAsTouched();
			toastr.warning(this.globals.switchLanguageValue['FILL_MANDATORY_FIELDS']);
			return false;
			}
		}
			getTrackerHistory(id: number) {
				this.currentTrackerId = id;
				this._trackerservice.getTrackerHistory(id).subscribe((response) => {
					if (response.success) {
						this.trackerHistory = response.data;
						this.showTrackerGrid = false;
						this.showTrackerHistory = true;
						this.trackerAssignment = new trackerAssignModel();
						this.trackerAssignment.tracker_id=id;
					}else{
						this.trackerHistory ={};
					}
				});
			}

	TrackerUnAssign() {
				this._trackerservice.unAssignTracker(this.currentTrackerId).subscribe((response) => {
					if (response.success) {
						toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
						this.getTrackerHistory(this.trackerAssignment.tracker_id);
						this.assignmentChanged = true;
					} else {
						toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
					}
				}, (error) => {
					toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
				});
	}
	//#endregion

	//#region Events

		toggleCreateTracker(refreshData){
			this.showTrackerGrid = !this.showTrackerGrid;
			this.showAddTracker = !this.showAddTracker;
			this.tracker = new trackerModel();
			this.showcreatButton=true;
			this.inputDisabled=false;
			
			if (refreshData){
				this.refreshDataTable();
			}
		}
		
		refreshDataTable(){
			this.trackerDT.refreshData();
		}

		toggleTrackerHistory(){
			this.showTrackerGrid = true;
			this.showTrackerHistory = false;
			this.trackerAssignment = new trackerAssignModel();
			if(this.assignmentChanged){
				this.refreshDataTable();
				this.assignmentChanged = false;
			}
		}

		// closepopup() {
		// 	this.showfilterPopUP = !this.showfilterPopUP;
		// 	if (this.showfilterPopUP){
		// 		this.filterpopupwindow = this.modalService.open(this.filterpopup, {size: 'lg'});
		// 	} else {
		// 		this.filterpopupwindow.close();
		// 	}
		// }


		closepopup() {
			if (this.cd){
				this.cd.closepopupdt();
			}
			//this.paging.search={};
		}

		resetSearch(event) {
			
			this.trackerDT.setFirstPageAndRefreshData();
			this.closepopup();
			this.paging.search={};
			this.getTrackerData(event, false, false);
		}

		toggleTrackerAssignPopUp() {
			this.showTrackerAssignPopUP = !this.showTrackerAssignPopUP;
			if (this.showTrackerAssignPopUP){
				this.trackerassignpopupwindow = this.modalService.open(this.trackerassignpopup, {size: 'lg'});
			} else {
				this.trackerassignpopupwindow.close();
			}
		}
	//#endregion
	downloadTrackers(sortBy, sortDirection, export_type, search){
		this.download = {
			sortBy: sortBy,
			sortDirection: sortDirection,
			export_type: export_type,
			search: search
		}

		if(this.download.export_type=='print'){
			this._trackerservice.getDownloadTrackers(this.download).subscribe((response) => {
				if (response.success) {
					this.url=response.data;
					var popupWinindow = window.open('', '_blank', 'width=900,height=800,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
					popupWinindow.document.open();
					popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + this.url + '</html>');
					popupWinindow.document.close();
				} else {
					toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
				}
			}, (error) => {
				toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
			});
		}
		else{
			this._trackerservice.getDownloadTrackers(this.download).subscribe((response) => {
			if (response.success) {
				this.url=response.data;
				this._commonService.downloadFileFromUrl(this.url, this.download.export_type, "TrackersMasterData");
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
