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
export  class ActivityLogService {
    constructor(public http: HttpClient) { }
    

    getActivityLogList(patientFilterModeldel){
        return this.http.post(environment.serviceurl+'/superadmin/ActivityLogController/getActivityLogs',JSON.stringify(patientFilterModeldel)).map((res: any) => res);
    }
	getActivityLogs(data): Observable<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/ActivityLogController/getActivityLogsExport', JSON.stringify(data)).map(res => res)
    }
    getAccounts(){
        return this.http.get(environment.serviceurl+'/superadmin/UserController/getAccountList').map((res: any) => res);
    }
    getUsers(id:number){
        return this.http.get(environment.serviceurl+'/superadmin/UserController/getUserActiveList/'+id).map((res: any) => res);
    }
}