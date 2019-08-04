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
import { TripsService } from '../../services/trips.service';
//import { User } from '../../superadmin/models/user.model';
import { Result } from '../../superadmin/models/response.model';
import { Notification } from "../../models/Notification.model";
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';
import { search } from '../../models/search.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MapService } from '../../services/map.service';
import { NotificationService} from '../../services/notification.service';
import { InfoWindow, DrawingManager, Circle } from '@ngui/map';
import { AppCommonService } from '../../services/appcommon.service';
import { JsonPipe } from '@angular/common';

declare let toastr;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  paging: any=new pagingModel();
  totalRecords: number = 0;
  notifications:Notification[]= [];
  notification:Notification = new Notification();
  showNotPopUP:boolean=false;
  @ViewChild('notificationPopup') notPopup;
  @ViewChild('tripsDT') tripsDT;
  @ViewChild('cd') cd;
  notificationPopuppwindow: NgbModalRef;
  constructor(private apphelper:AppHelper,private router: Router,
    private route: ActivatedRoute,
    private _notificationservice: NotificationService,public globals: Globals, private modalService: NgbModal,
    private _commonService: AppCommonService) { }
 /* Status = [
    { status: 1, status_name: "Completed" },
    { status: 2, status_name: "Running" },
]; */
/* ObjectTypes=[]; */
download:any;
	url:any;
ObjectTypes = [
  { value: "Vehicle", type: "Vehicle" },
  { value: "Location", type: "Location" },
  { value: "Trip", type: "Trip" }
];
vehicleIds:any[] = [];
userTypes =[{text:'Only Me',value:1},{text:'All Users',value:2}];
vehicleobj:any;
  ngOnInit() {
    //this.getAllNotifications(null,null,null);
    // this.getObjectTypes();
  this.paging.userType = 1;
  this.getVehiclesList();
      }

  getAllNotifications(event,  search = false, refresh = false) {
   
    if (this.paging == null){
        this.paging = new pagingModel();
		this.paging.userType = 1;
	}

    this.paging.pageSize = event.rows;
    this.paging.page = event.first;
    this.paging.sortBy = event.sortField;
    if (event.sortOrder == -1|| refresh == true) {
        this.paging.sortDirection = "desc";
    }
    else {
        this.paging.sortDirection = "asc";
    }
    if (refresh) {
        this.paging.search = {};
		this.paging.userType = 1;
   }
   this.paging.search.vehicle_id=this.vehicleobj ? this.vehicleobj.flag : null;
    this._notificationservice.getAllNotifications(this.paging).subscribe((response:any) => {
        
        if(response.success){
            this.notifications = response.data;
            this.totalRecords = response.totalrecords;
            if (search) {
              this.closepopup();
            }
         }
        else{
          this.notifications=[];
          toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
          
        }
    });
  }

  onSearchClicked(event){
    this.tripsDT.setFirstPageAndRefreshData();
   this.closepopup();
}
closepopup() {
    if (this.cd){
        this.cd.closepopupdt();
    }
}
resetSearch(event) {
    this.tripsDT.setFirstPageAndRefreshData();
    this.paging.search = {};
	this.paging.userType = 1;
    this.getAllNotifications(event,false,false);
    this.closepopup();
}
refreshDataTable(){
    this.tripsDT.refreshData();
}
 

  viewnotification(id:number)
  {
    this.showNotPopUP = true;
    if (this.showNotPopUP) {
      this.notificationPopuppwindow = this.modalService.open(this.notPopup, { size: 'lg' });
      //this.getNotification(id);
	  this.notification = this.notifications.find(n => n.id == id);
    } else {
      this.notificationPopuppwindow.close();
    }
  }
  
  getObjectTypes() {    
    this._notificationservice.getObjectTypes().subscribe((response:any) => {
      if(response.success){
          this.ObjectTypes = response.data;
      }
    });
  }

  closeNotification(){
    this.showNotPopUP = false;
    this.notificationPopuppwindow.close();
  }
  getVehiclesList() {
    this.vehicleIds = [];
    this._notificationservice.getVehicles().subscribe((response: any) => {
      if (response.success) {
        for (let vehicleId of response.data) {
          this.vehicleIds.push({label: vehicleId.registration_number, flag: vehicleId.id});
          /* this.vehicleIds.push({label: vehicleId.registration_number, flag: vehicleId.tracker_id}); */
          
        }
        //console.log(this.vehicleIds);
      }else{
        this.vehicleIds = [];
      }
    });
  }
  downloadNotifications(sortBy, sortDirection, export_type, search){
    this.download = {
      sortBy: sortBy,
      sortDirection: sortDirection,
      export_type: export_type,
      search: search,
      userType: this.paging.userType
    }
  //console.log(this.download);
    if(this.download.export_type=='print'){
      this._notificationservice.downloadNotifications(this.download).subscribe((response) => {
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
      this._notificationservice.downloadNotifications(this.download).subscribe((response) => {
      if (response.success) {
        this.url=response.data;
        this._commonService.downloadFileFromUrl(this.url, this.download.export_type, "NotificationData");
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
