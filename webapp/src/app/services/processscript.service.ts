import {Injectable} from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export  class ProcessScriptService  {
    constructor(public http: HttpClient) { }
    getProcessScriptList(){
		let par:HttpParams = new HttpParams().set("silentServerFetch", "1");
        return this.http.get(environment.serviceurl+'/superadmin/ProcessStatusController/getProcessScriptStatus',{ params:par }).map((res:any) => res);
    }
    setProcessStatusAction(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/ProcessStatusController/setProcessStatusAction', JSON.stringify(data)).map(res => res); 
    }
    getProcessExceptionList(){
        return this.http.get(environment.serviceurl+'/superadmin/ProcessStatusController/getProcessException').map((res:any) => res);
    }
    deleteProcessLog(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/ProcessStatusController/deleteAWSLogStream', JSON.stringify(data)).map(res => res); 
    }
    selectedCloudWatchLogName(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/ProcessStatusController/selectedCloudWatchLogName', JSON.stringify(data)).map(res => res); 
    }
    getTimeIntervalData(){
        return this.http.get(environment.serviceurl+'/Common/getAutoRefreshIntervals').map((res:any) => res);
    }
    getAutoRefreshData(){
        return this.http.get(environment.serviceurl+'/Common/userVariablesforMapView').map((res:any) => res);
    }
    addUpadateAutoRefreshData(data) {
		let par:HttpParams = new HttpParams().set("silentServerFetch", "1");
        return this.http.post(environment.serviceurl+'/Common/addUpdateUserVariables',JSON.stringify(data),{ params:par }).map((res:any) => res);
    }
    getIntervalTime(){
		let par:HttpParams = new HttpParams().set("silentServerFetch", "1");
        return this.http.get(environment.serviceurl+'/Common/getUserIntervalAutoRefresh',{ params:par }).map((res:any) => res);
    }
    
}