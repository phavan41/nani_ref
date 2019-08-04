import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { AlertService } from '../../services/alert.service';
import { AppHelper } from '../../apphelper';
import { Globals } from '../../globals/global';
import { businessGroup } from '../../models/businessgroup.model';
import { businessUnit } from '../../models/businessunit.model';

declare let toastr;

@Component({
  selector: 'app-manage-alerts',
  templateUrl: './manage-alerts.component.html',
  styleUrls: ['./manage-alerts.component.css']
})
export class ManageAlertsComponent implements OnInit {
  paging: pagingModel=new pagingModel();
  totalRecords: number = 0;
  alerts:any= [];
  bussinessgroup : businessGroup[]=[];
	busssinessunit : businessUnit[]=[];
  alert:any;
  alertTypeObjects:any=[];
  showNotPopUP:boolean=false;
  @ViewChild('alertPopup') notPopup;
  alertPopuppwindow: NgbModalRef;
  @ViewChild('alertsDT') alertsDT;
  showAlertsTable: boolean = true;
  @ViewChild('cd') cd;

  StatusTypes = [
    { id: 0, status: "CLOSE" },
    { id: 1, status: "OPEN" },
  ];

  constructor(
    private apphelper:AppHelper,
    public globals: Globals, private modalService: NgbModal,
    private _alertService:AlertService
  ) { }

  ngOnInit() {
    this.getBussinesslist();
    this.getAlertTypeObjects();
    
  }
  getBussinesslist(){
    this._alertService.getBusinessGroupsList().subscribe((response:any) => {
  this.bussinessgroup = response.data;
  })
}
  getBusinessUnitsList(id,event){
    this._alertService.getBusinessUnitList(id).subscribe((response) => {
      this.busssinessunit = response.data;
      if(event){
      this.getAllAlerts(event);
      }
    });
  }
  getAllAlerts(event,  search = false, refresh = false) {
    if (this.paging == null)
        this.paging = new pagingModel();
    this.paging.pageSize = event.rows;
    this.paging.page = event.first;
    this.paging.sortBy = event.sortField;
    if (event.sortOrder == 1|| refresh == true) {
        this.paging.sortDirection = "desc";
    }
    else {
        this.paging.sortDirection = "asc";
    }
    if (refresh) {
        this.paging.search = {};
   }
    this._alertService.getAllAlerts(this.paging).subscribe((response:any) => {
        if(response.success){
            this.alerts = response.data;
            this.totalRecords = response.totalrecords;
    }
    });
  }

  selectChanged(id, status) {
    	this._alertService.statusChanged({ "id": id, "status": status }).subscribe(
			(response: any) => {
				if (response.success) {
					toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
				}
			});
	}

  closepopup() {
    this.paging.search={}
    if (this.cd){
        this.cd.closepopupdt();
    }
}
onSearchClicked(event){
    this.alertsDT.setFirstPageAndRefreshData();
    this.closepopup();
}
resetSearch(event) {
    this.alertsDT.setFirstPageAndRefreshData();
    this.paging.search = {};
    this.getAllAlerts(event);
    this.closepopup();
}
refreshDataTable(){
    this.alertsDT.refreshData();
}
getAlertTypeObjects(){
  this._alertService.getAlertTypes().subscribe((response:any) => {
    if(response.success){
      this.alertTypeObjects = response.data;
    }
  });
}

alertid:any=[];
getAlertById(id:number)
  {
    this._alertService.getAlertById(id).subscribe((response:any) => {
        
      if(response.success){
          this.alertid = response.data[0];
      }
    });
  }


viewAlert(id:number)
  {
    this.showNotPopUP = true;
    if (this.showNotPopUP) {
      this.alertPopuppwindow = this.modalService.open(this.notPopup, { size: 'lg' });
      this.getAlertById(id);
    } else {
      this.alertPopuppwindow.close();
    }
  }
  closeAlert(){
    this.showNotPopUP = false;
    this.alertPopuppwindow.close();
  }
}
