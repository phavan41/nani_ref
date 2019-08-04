import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export  class RawdataService  {
    constructor(public http: HttpClient) { }
    //Getting addUser from Webservice
   /* addUser(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/superadmin/UserController/addUser', JSON.stringify(data)).map(res => res)
        
    }*/
    getRawCrumbs(patientFilterModel) {
        return this.http.post(environment.serviceurl+'/admin/RawCrumbsController/getRawCrumbs',JSON.stringify(patientFilterModel)).map((res: any) => res);
    }
    getDownloadRawCrumbs(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl +'/admin/RawCrumbsController/RawCrumbsExport', JSON.stringify(data)).map((res: any) => res);
    }
    
    // Trips  Report

    /* getTripReport(patientFilterModel) {
        return this.http.post(environment.serviceurl+'/admin/TripsController/getDayWiseReport',JSON.stringify(patientFilterModel)).map((res: any) => res);
    }
    getDownloadTripReport(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl +'/admin/TripsController/tripDayWiseExport', JSON.stringify(data)).map((res: any) => res);
    } */

}