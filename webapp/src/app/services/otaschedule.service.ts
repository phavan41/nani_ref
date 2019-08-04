import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import {AppSettings} from '../appSettings'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { pagingModel } from "../mastercomponents/shareddata/entities/pagingModel";
@Injectable()

export  class OTAScheduleReportService {
    constructor(public http: HttpClient) { }

    addOTAScheduleReport(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/JobSchedulerController/addUpdateJobSchedule', JSON.stringify(data)).map(res => res); 
    }
    getOTAScheduleReportList(patientFilterModeldel){
        return this.http.post(environment.serviceurl+'/superadmin/JobSchedulerController/getAllJobScheduled',JSON.stringify(patientFilterModeldel)).map((res: any) => res);
    }
    getIMEINumberList(){
        return this.http.get(environment.serviceurl+'/Common/getIMEINumbers').map((res: any) => res);
    }
    getDownloadOTAScheduleReportList(data): Observable<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/ReportsController/getAllUserReportScheduledExport', JSON.stringify(data)).map(res => res)
    }
    getOTAScheduleReportById(id:number){
        return this.http.get(environment.serviceurl + '/superadmin/JobSchedulerController/getJobScheduledById/' + id).map((res: any) => res);
    }
    deleteScheduleReportById(id:number){
        return this.http.get(environment.serviceurl + '/superadmin/JobSchedulerController/deleteJobScheduledById/' + id).map((res: any) => res);
    }
    /* scheduleReportStatusChanged(data): Observable<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/ReportsController/updateRSStatus', JSON.stringify(data)).map(res => res); 
    } */
    updateOTAScheduleReport(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/JobSchedulerController/addUpdateJobSchedule', JSON.stringify(data)).map(res => res); 
    }
}