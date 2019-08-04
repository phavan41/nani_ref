import { Component, OnInit, ViewChild } from '@angular/core';
import { AppHelper } from '../../apphelper';
import { Globals } from '../../globals/global';
import { ActivityLogService } from '../../services/activitylog.service';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { SelectedRange } from '../../models/selectedrange.model';
import { businessGroup } from '../../models/businessgroup.model';
import { AppCommonService } from '../../services/appcommon.service';

declare let toastr;

@Component({
  selector: 'app-activitylog',
  templateUrl: './activitylog.component.html',
  styleUrls: ['./activitylog.component.css']
})
export class ActivitylogComponent implements OnInit {

  showActivityLogGrid:boolean=true;
  @ViewChild('cd') cd;
  @ViewChild('activityLogDT') activityLogDT;
  @ViewChild('filter') filter;
  activitylog_list :any = [];
  totalRecords:any ;
  paging:pagingModel = new pagingModel();
  selectedRange: SelectedRange = new SelectedRange();
  users_lits:businessGroup[] =[];
  account_list:any [] = [];
  download:any;
	url:any;
  constructor(private apphelper:AppHelper,
    public globals: Globals, private _activityLogService:ActivityLogService,
    private _commonService: AppCommonService) { }

  ngOnInit() {
   this.getAccounts();
   this.getUserList();
  }
  showActivityLog:boolean = false;
  getAccounts(){
    this._activityLogService.getAccounts().subscribe((response: any) => {
			if (response.success) {
        this.account_list = response.data;
        
			} else{
        this.account_list = [];
        toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
      }
    }, (error) => {
      toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
    });
  }
  getUserList(){
    if(this.paging.search.account_ids != null){
      this.showActivityLog = true;
      this.getActivityLogList(event);
      this._activityLogService.getUsers(this.paging.search.account_ids).subscribe((response: any) => {
        if (response.success) {
          this.users_lits = response.data;
        } else{
          this.users_lits = [];
          toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
        }
      }, (error) => {
        toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
      });
    }
    
  }
 
  getActivityLogList(event,search=false,refresh=false) {
    debugger;
        if(this.showActivityLog){
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
          if(this.selectedRange.startDate != null && this.selectedRange.endDate){
            this.paging.search.from_date = this.selectedRange.startDate;
            this.paging.search.to_date = this.selectedRange.endDate; 
            //console.log(this.paging.search.from_date + "  "+this.paging.search.to_date);
          }
          this._activityLogService.getActivityLogList(this.paging).subscribe((response) => {
            //console.log(response);
            if (response.success) {
              this.activitylog_list = response.data;
              this.totalRecords = response.totalrecords;
              //this.closepopup();
              if (search) {
                    this.closepopup();
                  }
              
            }
            else{
              this.activitylog_list = [];
              toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
            }
          }, (error) => {
            toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
          });
      }else{
        toastr.warning(this.globals.switchLanguageValue["Please_Select_Account"]);
      }
  }
  onSearchClicked(event){
		this.activityLogDT.setFirstPageAndRefreshData();
		this.closepopup();
	}
  closepopup() {
    if (this.cd){
      this.cd.closepopupdt();
  }
}
resetSearch(event) {
  this.paging.search = {};
  this.selectedRange = {};
    this.getActivityLogList(event,true);
    
  this.closepopup();
}
refreshDataTable(){
    this.paging.search = {};
    this.activityLogDT.refreshData();
}
downloadActivityLogs(sortBy, sortDirection, export_type, search){
  this.download = {
    sortBy: sortBy,
    sortDirection: sortDirection,
    export_type: export_type,
    search: search
  }

  if(this.download.export_type=='print'){
    this._activityLogService.getActivityLogs(this.download).subscribe((response) => {
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
    this._activityLogService.getActivityLogs(this.download).subscribe((response) => {
    if (response.success) {
      this.url=response.data;
      this._commonService.downloadFileFromUrl(this.url, this.download.export_type, "ActivityLogData");
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
