import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { HttpModule } from '@angular/http';
import { AuthModule } from './authentication/auth.module';
import { AppComponent } from './app.component';
import {CustomHttpHandler} from './http.Interceptor';
import {HTTP_INTERCEPTORS,HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomFormsModule } from 'ng2-validation'
import { FormsModule } from '@angular/forms';
import { GlobalErrorHandler } from './error.handler';
import { CommonService } from './authentication/auth.service';
import {LogginCheckGuard} from './logincheck'
import { NouisliderModule } from 'ng2-nouislider';
import {UserAccountService} from './services/useraccount.service';
import { CountryService } from "./services/countries.service";
import { SettingsService } from "./services/settings.service";
import { VehicleService } from "./services/vehicle.service";
import { DriverService } from "./services/driver.service";
import { ProfileActionService } from "./services/profileaction.service";
import { UserProfileService } from './services/userprofile.service';
import { LocationService } from "./services/location.service";
import { LanguageService } from "./services/language.service";
import { TimeZoneService } from "./services/time_zone.service";
import { TrackerService } from "./services/tracker.service";
import { Globals } from './globals/global';
import { TripsService } from "./services/trips.service";
import { AccountListService } from "./services/accountlist.service";
import { MyFormDirective } from './globals/myform'
import { TechnicalSettingService } from "./services/technical-setting.service";
import { AppCommonService } from './services/appcommon.service';
import { MapService } from "./services/map.service";
import { VehicleSettingService } from "./services/vehicle_settings.service";
import { ManageUsersService } from "./services/managemenus.service";
import { DashboardService } from './services/dashboard_service';
import { NotificationService } from './services/notification.service';
import { AppHelper } from './apphelper';
import {TagInputModule} from '../../node_modules/ngx-chips';
import { AlertService } from './services/alert.service';
import { MailTemplateSettingsService } from './services/mailtemplate.service';
import { RawdataService } from "./services/rawdata.service";
import { ExpenseService } from './services/expense.service';
import { ExpenseReportService } from './services/expensereport.service';
import { OutGoingMessageService } from './services/outgoingmessage.service';
import { NgxMaskModule } from 'ngx-mask-2';
import { ReportService } from './services/reports.service';
import { SummaryVehicleReoportService } from './services/summaryvehiclemovement.serivce';
import { MovementWithWorkingService } from './services/movementwithworking.service';
import { StopsWithGeofenceService } from './services/stopswithgeofence.service';
import { DrivingBehaviorReportService } from './services/drivingbehaviorreport.service';
import { ProcessScriptService } from './services/processscript.service';
import { HighchartsChartModule } from 'highcharts-angular';
import { ActivityLogService } from './services/activitylog.service';
import { VehicleServiceReminderService } from './services/serviceReminder.service';
import { ScheduleReportService } from './services/schedulereport.service';
import { OTAScheduleReportService } from './services/otaschedule.service';
import { TreeviewModule } from '../ngx-treeview/treeview.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
		FormsModule,
		CustomFormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AuthModule,
        HttpModule,
        BrowserAnimationsModule,
        NouisliderModule,
        TagInputModule,
        HighchartsChartModule,
        NgxMaskModule.forRoot(),
        TreeviewModule.forRoot()
    ],
    providers: [AppCommonService,CommonService,LogginCheckGuard,CountryService, LocationService,LanguageService,
        UserAccountService,SettingsService,VehicleService,DriverService,UserProfileService,ProfileActionService,
        Globals,TrackerService,TripsService,AccountListService,TechnicalSettingService,ManageUsersService,MapService,
        VehicleSettingService,DashboardService,NotificationService,AppHelper, AlertService,TimeZoneService,MailTemplateSettingsService,RawdataService,ExpenseService,ExpenseReportService,OutGoingMessageService, ReportService,SummaryVehicleReoportService, MovementWithWorkingService, StopsWithGeofenceService,DrivingBehaviorReportService, ProcessScriptService, ActivityLogService, VehicleServiceReminderService, ScheduleReportService, OTAScheduleReportService, 
        {provide:HTTP_INTERCEPTORS,useClass:CustomHttpHandler,multi:true},
        {provide:ErrorHandler,useClass:GlobalErrorHandler}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
