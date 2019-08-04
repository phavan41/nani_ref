import { Component, OnInit, ViewChild } from '@angular/core';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { AppHelper } from '../../apphelper';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Globals } from '../../globals/global';
import { OTAScheduleReportService } from '../../services/otaschedule.service';
import { AppCommonService } from '../../services/appcommon.service';
import { NgForm } from '@angular/forms';
import { OTASchedule } from '../models/otaschedule.model';
import { Time } from '../../models/schedulereport.model';
import { SelectedRange } from '../../models/selectedrange.model';

declare let toastr;

@Component({
  selector: 'app-ota-schedule',
  templateUrl: './ota-schedule.component.html',
  styleUrls: ['./ota-schedule.component.css']
})
export class OTAScheduleComponent implements OnInit {

  paging: pagingModel = new pagingModel();
  totalRecords:number;
  otascheduleList:any[] = [];
  download:any;
    url:any;
    showScheduleReportGrid : boolean = true;
    showOTAScheduledReportPopup: boolean = false;
    showUpdateButton:boolean = false;
    /* showAddScheduledReportPopup: boolean = false; */
  @ViewChild('cd') cd;
  @ViewChild('OTAscheduleReportDT') scheduleReportDT;
  @ViewChild('OTAScheduledReportPopup') addOTAScheduledReportPopup;
  addOTAScheduledReportPopupwindow: NgbModalRef;
  otaSchedule:OTASchedule = new OTASchedule();
  schedule_time:Time = new Time();
  selectedRange: SelectedRange = new SelectedRange();
  imeinumber_list:any = [];
  jobStatus = [
		{ status: 0, status_name: "Schedule" },
		{ status: 1, status_name: "Completed" }
  ];
  Status = [
		{ status: 0, status_name: "In Active" },
		{ status: 1, status_name: "Active" }
	];
  constructor(private apphelper:AppHelper,private modalService: NgbModal,
    public globals: Globals, private _scheduleReportService:OTAScheduleReportService, private _commonService: AppCommonService) { }

  ngOnInit() {
    
    this.getIMEINumberList();
  }
      getIMEINumberList(){
        this.imeinumber_list = [];
        this._scheduleReportService.getIMEINumberList().subscribe((response) => {
          if (response.success) {
			      for(let o of response.data){
                let data={"id":o.imei_number, "tarckerdata":o.imei_number}
                this.imeinumber_list.push(data);
			      }
          }else {
            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
          }
        });
      }
      getOTAScheduleReportList(event,search=false,refresh=false) {
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
        
        if(refresh){
          this.paging.search={};
        }
		
		if (this.selectedRange.startDate.length > 0 && this.selectedRange.endDate.length > 0){
			this.paging.search.from_date = this.selectedRange.startDate;
			this.paging.search.to_date = this.selectedRange.endDate;
		}
        this._scheduleReportService.getOTAScheduleReportList(this.paging).subscribe((response) => {
          //console.log(response);
          if (response.success) {
            this.otascheduleList = response.data;
            this.totalRecords = response.totalrecords;
            
          }else {
            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
          }
        });
    }
    onSearchClicked(event){
      this.scheduleReportDT.setFirstPageAndRefreshData();
      this.closepopup();
    }
    closepopup() {
			if (this.cd){
				this.cd.closepopupdt();
			}
    }
    resetSearch() {
			this.paging.search={};
			this.scheduleReportDT.setFirstPageAndRefreshData();
			this.closepopup();
			
    }
    refreshDataTable(){
			this.scheduleReportDT.refreshData();
    }
    openScheduleReportPopup(){
        this.showOTAScheduledReportPopup = true;
        this.showUpdateButton=false;
        if (this.showOTAScheduledReportPopup){
          this.addOTAScheduledReportPopupwindow = this.modalService.open(this.addOTAScheduledReportPopup, {size:'lg',backdrop  : 'static', keyboard  : true});
          
        } else {
          this.addOTAScheduledReportPopupwindow.close();
        }
    }
    closeOTAScheduledReportsPopup(){
      this.addOTAScheduledReportPopupwindow.close();
      this.otaSchedule = new OTASchedule();
      this.schedule_time = new Time();
    }
    
    addOTAScheduleReport(f:NgForm){
      debugger;
          f.form.markAsTouched();
          if (f.valid) {
            if(this.schedule_time != null){
              let time = this.schedule_time.hour+":"+this.schedule_time.minute+":"+this.schedule_time.second;
              this.otaSchedule.schedule_time = time;
            }
            if(this.otaSchedule.id != null && this.otaSchedule.id >0){
                  this._scheduleReportService.updateOTAScheduleReport(this.otaSchedule).subscribe((response: any) => {
                    if (response.success) {
                      toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
                    this.closeOTAScheduledReportsPopup();
                    this.refreshDataTable();
                    }else {
                      toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
                    }
                }, (error) => {
                  toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
                });
            }else{
              //console.log("OTA Data ==   "+ JSON.stringify(this.otaSchedule));
              this._scheduleReportService.addOTAScheduleReport(this.otaSchedule).subscribe((response: any) => {
                  if (response.success) {
                    toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
                  this.closeOTAScheduledReportsPopup();
                  this.refreshDataTable();
                  }else {
                    toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
                  }
              }, (error) => {
                toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
              });
            }
            
           
          //console.log("Schedule report data == "+JSON.stringify(this.scheduleReport));
        }else {
          f.form.markAsTouched();
          toastr.warning(this.globals.switchLanguageValue['FILL_MANDATORY_FIELDS']);
          return false;
        }
    }
  
    downloadScheduleReportList(sortBy, sortDirection, export_type, search){
			this.download = {
				sortBy: sortBy,
				sortDirection: sortDirection,
				export_type: export_type,
				search: search
			}
  /*       if(this.download.export_type=='print'){
          this._scheduleReportService.getDownloadScheduleReportList(this.download).subscribe((response) => {
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
          this._scheduleReportService.getDownloadScheduleReportList(this.download).subscribe((response) => {
          if (response.success) {
            this.url=response.data;
            this._commonService.downloadFileFromUrl(this.url, this.download.export_type, "ScheduleReport");
            toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
          } else {
            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
          }
        }, (error) => {
          toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
        });
      } */
    }
    getOTAScheduleById(id:number){
      if(id!= null){
          this._scheduleReportService.getOTAScheduleReportById(id).subscribe((response: any) => {
            if (response.success) {
              this.otaSchedule = response.data;
              if(this.otaSchedule.schedule_time != null){
                let time = this.otaSchedule.schedule_time.split(":");
               // console.log("time data  == "+time);
                let schedule_time ;
                schedule_time={"hour":time[0],"minute":time[1],"second":time[2]};
               // console.log("time data  == "+schedule_time);
                this.schedule_time = schedule_time;
              }
              this.showUpdateButton=true;
              this.addOTAScheduledReportPopupwindow = this.modalService.open(this.addOTAScheduledReportPopup, {size:'lg',backdrop  : 'static', keyboard  : true});
            
            }else {
              toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
            }
        }, (error) => {
          toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
        });
      }else{
       // toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
      }
     
    }
    deleteOTAScheduleById(id:number){
        if(id!= null){
          this._scheduleReportService.deleteScheduleReportById(id).subscribe((response: any) => {
            if (response.success) {
              toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
              this.refreshDataTable();
            }else {
              toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
            }
        }, (error) => {
          toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
        });
      }else{
      // toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
      }
    }
}
