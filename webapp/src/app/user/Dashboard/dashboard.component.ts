import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../authentication/auth.service';
import { DashboardService } from '../../services/dashboard_service';
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';
import { Helper } from '../helper';
import * as Highcharts from 'highcharts';

//import * as _moment from '../../../assets/js/moment.js';
import * as moment from 'moment-timezone';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { last } from 'rxjs/operators';
import { SelectedRange } from '../../models/selectedrange.model';

declare let toastr;
@Component({
    selector: 'app-user-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit,AfterViewInit {
    Drivers = {};
    dashBoardData:any=[];
    dashboard_result:any ={};
    total:any = 0;
    Highcharts = Highcharts;
    fleet_Highcharts = Highcharts;
    summaryUpdateFlag = false;
    paging: pagingModel = new pagingModel();
    fleet_distance_list:any [] = [];
    total_fleetDistance:any;
    autoRefresh: boolean = false;
  autoRefreshChecked: boolean = false;
  timeIntervalData: any[]=[{"intervals":15},{"intervals":30},{"intervals":60},{"intervals":120},{"intervals":180}];
  autoRefreshInterval: number = 15;
  fun: any;
  chartOptions = {
    chart: {
        type: 'bar',
        backgroundColor:'#F7F8FC'
    },
    xAxis: {
        categories: ['No Previous Data', 'Moving', 'Idle', 'Parking', 'Disconnected']
    },
    title: {
        text: ''
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total Fleet consumption'
        }
    },
    legend: {
        reversed: false
    },
    colors: ['#0d233a'],
    series: [{
      data: [0, 0, 0, 0, 0]
    }]
  };
  fleetDistance_options = {
    chart: {
        type: 'column',
        height:300
    },
    title:{
        text:null
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }, 
    yAxis: {
        min: 0,
        title: {
            text: 'Distance (Kms)'
        }
    },
    legend: {
        layout:'horizontal',
        floating: true,
        backgroundColor: '#FFFFFF',
        align: 'right',
        verticalAlign: 'top',
        x: 60,
        y: -60
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y;
        }
    },
    series: [{
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }]
}
   selectedRange: SelectedRange = new SelectedRange();;
  
  /*ranges: any = {
			  'Today': [moment(), moment()],
			  'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
			  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
			  'This Month': [moment().startOf('month'), moment().endOf('month')],
			  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			};
  datePickerTimeZone: string = '';*/
  
    constructor(private apphelper:AppHelper,public auth: CommonService, private dashBoardService: DashboardService, public globals: Globals, public helper:Helper) {
     }
	 
	 ngAfterViewInit(){
		//this.setDateRanges();
	 
	 }
     onSelectedAutoRefreshInterval(checked: boolean) {
        this.funautorefresh();
      }
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
      refreshAllTabsData(){
        this.getData();
        this.getFleetDistanceList();
        this.getDashBoardData();
      }
      onSelectedAutoRefresh(event) {
        this.autoRefreshChecked = !this.autoRefreshChecked;
        let data = { autoRefreshChecked : this.autoRefreshChecked }
        if (this.autoRefreshChecked){
                this.funautorefresh();
            }
      }
	 setDateRanges(){
		if (this.globals && this.globals.currentTimezonedata && this.globals.currentTimezonedata.gmt_offset_mins){
			//moment.tz.setDefault(this.globals.currentTimezonedata.time_zone_name);
			//this.datePickerTimeZone = this.globals.currentTimezonedata.time_zone_name;
			/*this.ranges = {
			  'Today': [this.helper.currentTime(), this.helper.currentTime()],
			  'Yesterday': [this.helper.currentTime().subtract(1, 'days'), this.helper.currentTime().subtract(1, 'days')],
			  'Last 7 Days': [this.helper.currentTime().subtract(6, 'days'), this.helper.currentTime()],
			  'Last 30 Days': [this.helper.currentTime().subtract(29, 'days'), this.helper.currentTime()],
			  'This Month': [this.helper.currentTime().startOf('month'), this.helper.currentTime().endOf('month')],
			  'Last Month': [this.helper.currentTime().subtract(1, 'month').startOf('month'), this.helper.currentTime().subtract(1, 'month').endOf('month')]
			};*/
			
		} else {
			var that = this;
			setTimeout(function(){
				that.setDateRanges();
			},500);
		}
	 }

    ngOnInit() {
		this.selectedRange ={start: moment().subtract(6, 'days'), end: moment(), startDate:moment().subtract(6, 'days').format("MM/DD/YYYY HH:mm:ss"), endDate: moment().format("MM/DD/YYYY HH:mm:ss")};
        this.getDashBoardData();
        this.getData();
        this.sendDateRangeToFleetDistance();
    }
    
    sendDateRangeToFleetDistance(){
        this.paging.search.from_date = this.selectedRange.startDate;
        this.paging.search.to_date = this.selectedRange.endDate;
        this.getFleetDistanceList();
    }
    getFleetDistanceList(){
        //debugger;   
        this.fleet_distance_list = [];
        //console.log(this.paging.search);
        this.dashBoardService.getFleetDistanceList(this.paging.search).subscribe((response:any)=>{
            if(response.success){
                this.fleet_distance_list=response.data;
                this.total_fleetDistance = response.total;
                //console.log(this.fleet_distance_list);
				/* this.chartOptions.series[0].data = [previousDataCount, isMovingCount,isIdle,ParkingCountno,disConnected];
                this.summaryUpdateFlag = true; */
                let serie_data = [];
                let category_data = [];
                for(let o of response.data){
                    serie_data.push(o.from_date);
                    category_data.push(parseFloat(o.distance));
                }
                this.fleetDistance_options  = {
                    chart: {
                        type: 'column',
                        height:300
                    },
                    title:{
                        text:null
                    },
                    xAxis: {
                        categories: serie_data
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Distance (Kms)'
                        }
                    },
                    legend: {
                        layout:'horizontal',
                        floating: true,
                        backgroundColor: '#FFFFFF',
                        align: 'right',
                        verticalAlign: 'top',
                        x: 60,
                        y: -60
                    },
                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.series.name+ '</b><br/>' +
                                this.x + ': ' + this.y;
                        }
                    },
                    series: [{
                        data: category_data
                    }]
                } 
                /*this.fleetDistance_options.series[0].data = category_data;
                 this.fleetDistance_options.xAxis.categories = serie_data;
                 console.log("Series Data ==  "+serie_data);
                console.log("Category Data ==  "+this.fleetDistance_options.series[0].data); */
              
            }
			else {
				toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
			}
        },(error) => {
			toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
		});
    }
    getDashBoardData(){
        this.dashBoardService.getDashboardData().subscribe((response:any)=>{
            if(response.success){
				this.dashBoardData=response.data;
            }
        });
    }
	getData(){
        //debugger;
        let previousDataCount = 0;
            let isMovingCount = 0;
            let isIdle = 0;
            let ParkingCountno = 0;
            let disConnected = 0;
          this.dashBoardService.getDashboardList().subscribe((response:any)=>{
            if(response.success){
				this.dashboard_result=response.data;
				previousDataCount = response.data.noPreviousDataCount;
				isMovingCount = response.data.isMovingCount;
				isIdle = response.data.isIdleCount;
				ParkingCountno = response.data.ParkingCount;
				disConnected = response.data.disConnectedCount;
				
				this.total = previousDataCount +  isMovingCount + isIdle + ParkingCountno + disConnected;
				
				this.chartOptions.series[0].data = [previousDataCount, isMovingCount,isIdle,ParkingCountno,disConnected];
				this.summaryUpdateFlag = true;
            }
			else {
				toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
			}
        },(error) => {
			toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
		});
    }
}
