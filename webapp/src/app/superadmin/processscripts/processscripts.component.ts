import { Component, OnInit, ViewChild } from '@angular/core';
import { Globals } from '../../globals/global';
import { ProcessScriptService } from '../../services/processscript.service';
import { AppHelper } from '../../apphelper';
import { formatMoment, formatDate } from 'ngx-bootstrap/chronos/format';
import { DatePipe } from '@angular/common';
import { TabHeadingDirective } from 'ngx-bootstrap';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';


declare let toastr;


@Component({
  selector: 'app-processscripts',
  templateUrl: './processscripts.component.html',
  styleUrls: ['./processscripts.component.css']
})
export class ProcessscriptsComponent implements OnInit {

  constructor(public globals: Globals, public process_scriptService:ProcessScriptService,
    private apphelper:AppHelper) { }
  scriptList:any[] = [];
  processList:any [] = [];
  logStreamName:string = 'All';
  summaryViewTabIndex: number = 1;
  processExceptionList : any [] = [];
  from_date:any;
  to_date:any;
  date:Date = new Date();
  data:number;
  datePipe:DatePipe = new DatePipe('en-UK');
  autoRefresh: boolean = false;
  autoRefreshChecked: boolean;
  timeIntervalData: any[]=[];
  autoRefreshInterval: number = 15;
  intervalData:any ={};
  fun: any;
  @ViewChild('cd') cd;
  @ViewChild('processDT') processDT;
  @ViewChild('data')  processData;
  @ViewChild('processExceptionDT') processExceptionDT;
  showProcessGrid:boolean=true;
  totalrecords:number;
  paging: pagingModel = new pagingModel();
  showProcessExceptionTable:boolean = true;
  ngOnInit() {
    this.getTimeIntervalData();
    //this.getAutoRefreshData();
    this.to_date = this.date.toUTCString();
    let day:number;
    day = this.date.getDate();
   let year:number= new Date().getFullYear();
   let month:number = new Date().getMonth();
   
    if(day){
      this.data = day-1;
    }

   let current_date:Date = new Date(year,month,this.data);
    this.from_date = this.datePipe.transform(current_date,'MM/dd/yyyy');
    //this.to_date=this.datePipe.transform(this.date,'MM/dd/yyyy');
    //this.from_date = moment().add(this.data, 'days').calendar();
    this.to_date = moment().format('L');
    this.getProcessExceptionAction();
    /* this.getProcessScriptList(); */
    this.getProcessExceptionList();
  }
  getProcessScriptList() {
    this.process_scriptService.getProcessScriptList().subscribe((response) => {
      if(response.success){
        this.scriptList = response.data;
      }else{
        toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
      }
      
    },(error) => {
      toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
    });
  }
  
  refreshDataTable(){
		this.processExceptionDT.setFirstPageAndRefreshData();
		this.getProcessExceptionAction();
	}

  setProcessStatusAction(script_name:string, subgroup_name:string, process_status:number, type:string,shell_command:string){
    let data ={script_name:script_name,
      subgroup_name:subgroup_name,
      process_status:process_status,
      type:type,
      shell_command:shell_command
    }
    /* debugger;
    console.log(JSON.stringify(data)); */
    this.process_scriptService.setProcessStatusAction(data).subscribe((response) => {
      if(response.success){
        this.getProcessScriptList();
        toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
        
      }else{
        toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
      }
      
    },(error) => {
      toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
    });
  }
  getProcessExceptionList() {
    this.process_scriptService.getProcessExceptionList().subscribe((response) => {
      if(response.success){
        this.processExceptionList = response.data;
        //console.log(this.processExceptionList);
      }else{
        toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
      }
      
    },(error) => {
      toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
    });
  }
  getTabSwitching(){
    this.summaryViewTabIndex=1;
  }
  getProcessExceptionAction(){
    //console.log(logStreamName);
    
    if (this.paging == null){
			this.paging = new pagingModel();
    }
    this.paging.search.from_date = this.from_date;
    this.paging.search.to_date = this.to_date;
    this.paging.search.logStreamName = this.logStreamName;
    
    this.process_scriptService.selectedCloudWatchLogName(this.paging).subscribe((response) => {
      if(response.success){
        this.processList = response.data;
        this.totalrecords = response.totalrecords;
       
      }else{
        toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
      }
      
    },(error) => {
      toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
    });
  }
  onSearchClicked(event){
		this.processExceptionDT.setFirstPageAndRefreshData();
		this.getProcessExceptionAction();
		this.closepopup();
  }
  closepopup() {
    if (this.processData){
      this.processData.closepopupdt();
    }
  }
  resetSearch(){
    this.paging.search= {};
    this.to_date = this.date.toUTCString();
    let day:number;
    day = this.date.getDate();
   let year:number= new Date().getFullYear();
   let month:number = new Date().getMonth();
   
    if(day){
      this.data = day-1;
    }

   let current_date:Date = new Date(year,month,this.data);
    this.from_date = this.datePipe.transform(current_date,'MM/dd/yyyy');
    this.to_date = moment().format('L');
		this.processExceptionDT.setFirstPageAndRefreshData();
		this.getProcessExceptionAction();
    this.closepopup();
  }
  getTimeIntervalData() {
    this.process_scriptService.getTimeIntervalData().subscribe(response => {
      if(response.success){
        this.timeIntervalData = response.data;
        
      }else{
        toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
      }
      
    },(error) => {
      toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
    });
  }
  /*getAutoRefreshData() {
    this.process_scriptService.getAutoRefreshData().subscribe(response => {
		if (response.success){
			this.autoRefreshChecked = response.data.autorefresh == 1;
			this.autoRefreshInterval = response.data.autorefreshinterval;
			
			if (this.autoRefreshChecked){
				this.funautorefresh();
			}
		} else {
			this.autoRefreshChecked = false;
			this.autoRefreshInterval = 10;
		}
    });
  }*/
  deleteProcess(event){
     let val = confirm('Are you sure want to delete all?');
    /* debugger;
    console.log(val); */
   
    let data = {logStreamName:this.logStreamName};
    if(val === true){
      //console.log("delete all called == "+this.logStreamName);
       this.process_scriptService.deleteProcessLog(data).subscribe((response) => {
      if(response.success){
        toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
      }else{
        toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
      }
	  this.refreshDataTable();
      
    },(error) => {
      toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
    });  
    }else{
      /* console.log("not delete all called == "); */
    }
   
  }
  refreshAllTabsData(){
    this.getProcessScriptList();
  }
  onSelectedAutoRefresh(event) {
	this.autoRefreshChecked = !this.autoRefreshChecked;
    let data = { autoRefreshChecked : this.autoRefreshChecked };
	//this.callAddUpdateUserVariable(data, this.autoRefreshChecked);
	if (this.autoRefreshChecked){
			this.funautorefresh();
		}
  }
  onSelectedAutoRefreshInterval(checked: boolean, intervalId: number) {
	this.funautorefresh();
  }
  /*callAddUpdateUserVariable(data,getIntervalData = false){
    this.process_scriptService
        .addUpadateAutoRefreshData(data)
        .subscribe(response => {
          if (response.success) {
            toastr.success(
              this.apphelper.parseMessageFromLanguage(response.message)
            );
          }
      
      if (getIntervalData){
        this.getIntervalTime();
      }
        });
    }*/
    // getIntervalTime() {
      // this.process_scriptService.getIntervalTime().subscribe(response => {
        // if (response.success) {
          //console.log("got response");
          // this.autoRefreshInterval = response.data;
          // this.funautorefresh();
        // } else {
          // /*toastr.warning(
            // this.apphelper.parseMessageFromLanguage(response.message)
          // );*/
        // }
      // });
    // }
    funautorefresh() {
      if (this.fun){
      clearInterval(this.fun);
      }
    this.fun = null;
      if (this.autoRefreshInterval != null && this.autoRefreshInterval > 0){
        this.fun = setInterval(() => {
          if (this.autoRefreshChecked ) {
            this.refreshAllTabsData();
          } else {
            if (!this.autoRefreshChecked) {
              clearInterval(this.fun);
        this.fun = null;
            }
          }
        }, this.autoRefreshInterval*1000);
    }
    }
    ngOnDestroy(){ 
      if (this.fun != null){
        clearInterval(this.fun);
        this.fun = null;
        
      }
    }
}
