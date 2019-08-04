import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient , HttpHeaders} from '@angular/common/http'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import {AppSettings} from '../appSettings'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { pagingModel } from "../mastercomponents/shareddata/entities/pagingModel";
import {AppCommonService} from './appcommon.service';
@Injectable()

export  class ScheduleReportService {
    constructor(public http: HttpClient, public commonService:AppCommonService) { }

    addScheduleReport(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/ReportsController/addUpdateReportScheduler', JSON.stringify(data)).map(res => res); 
    }
    getScheduleReportList(patientFilterModeldel){
        return this.http.post(environment.serviceurl+'/admin/ReportsController/getAllUserReportScheduled',JSON.stringify(patientFilterModeldel)).map((res: any) => res);
    }
    getDownloadScheduleReportList(data): Observable<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/ReportsController/getAllUserReportScheduledExport', JSON.stringify(data)).map(res => res)
    }
    getScheduleReportById(id:number){
        return this.http.get(environment.serviceurl + '/admin/ReportsController/getUserReportScheduledById/' + id).map((res: any) => res);
    }
    deleteScheduleReportById(id:number){
        return this.http.get(environment.serviceurl + '/admin/ReportsController/deleteUserReportScheduledById/' + id).map((res: any) => res);
    }
    scheduleReportStatusChanged(data): Observable<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/ReportsController/updateRSStatus', JSON.stringify(data)).map(res => res); 
    }
    updateScheduleReport(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/ReportsController/addUpdateReportScheduler', JSON.stringify(data)).map(res => res); 
    }
    getReportScheduledExecutedList(patientFilterModeldel){
        return this.http.post(environment.serviceurl+'/admin/ReportsController/getReportScheduledExecuted',JSON.stringify(patientFilterModeldel)).map((res: any) => res);
    }
    downloadExecutedScheduleReportList(id,filename){
		this.commonService.downloadFileFromUrl(environment.serviceurl + '/admin/ReportsController/getSRExecutedDownloadById/' + id,filename.split('.').pop(),filename.split('.')[0]);
    }
}