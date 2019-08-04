import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { DataTableModule } from '../../mastercomponents/ngbcomponents/datatable/datatable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';
//import { User } from '../../superadmin/models/user.model';
import { Result } from '../../superadmin/models/response.model';
import { Trips } from "../../models/trips.model";
import { Rawdata } from "../../models/rawdata.model";
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';
import { search } from '../../models/search.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppCommonService } from '../../services/appcommon.service';
import { RawdataService } from '../../services/rawdata.service';

declare let toastr;

@Component({
  selector: 'app-rawdataevents',
  templateUrl: './rawdataevents.component.html',
  styleUrls: ['./rawdataevents.component.css']
})
export class RawdataeventsComponent implements OnInit {

  paging: pagingModel=new pagingModel();
  //search: search = new search();
  rawdata: Rawdata[] = [];
  totalRecords: number = 0;
  @ViewChild('cd') cd;
  @ViewChild('tripsDT') tripsDT;
  download:any;
  url:any;
  showTable: boolean = true;

  constructor(private apphelper:AppHelper,private router: Router,
    private route: ActivatedRoute,
    private _rawdataService: RawdataService,public globals: Globals, private modalService: NgbModal,private _commonService: AppCommonService) { }

  ngOnInit() {
  }

  getAllCrumbs(event,  search = false, refresh = false) {
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
    this._rawdataService.getRawCrumbs(this.paging).subscribe((response:any) => {
        
        if(response.success){
            this.rawdata = response.data;
        this.totalRecords = response.totalrecords;
        if (search) {
            this.closepopup();
        }
    }
    else{
      this.rawdata = [];
      this.totalRecords = 0;
      toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
    }
    });
}

closepopup() {
    //this.paging.search={}
    if (this.cd){
        this.cd.closepopupdt();
    }
}
onSearchClicked(event){
    this.tripsDT.setFirstPageAndRefreshData();
   this.closepopup();
}
resetSearch(event) {
    this.paging.search = {};
	this.tripsDT.setFirstPageAndRefreshData();
    //this.getAllCrumbs(event, false, false);
    this.closepopup();
}
refreshDataTable(){
    this.tripsDT.refreshData();
}

downloadRawCrumbs(sortBy, sortDirection, export_type, search){
    this.download={
        sortBy:sortBy,
        sortDirection:sortDirection,
        export_type:export_type,
        search:search
    }
    if(this.download.export_type=='print'){
        this._rawdataService.getDownloadRawCrumbs(this.download).subscribe((response) => {
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
    this._rawdataService.getDownloadRawCrumbs(this.download).subscribe((response) => {
        if (response.success) {
            this.url=response.data;
            //window.location.href=this.url;
            //window.open(this.url,"_blank");
            this._commonService.downloadFileFromUrl(this.url, this.download.export_type,"RawCrumbData");
            toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
        } else {
            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
        }
    }, (error) => {
        toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
    });
}
}
getMap(id:number,lat:number,lng:number){
    var popupWinindow = window.open('https://www.google.com/maps/?q='+lat+','+lng);
}
}
