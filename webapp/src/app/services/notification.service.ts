import {Injectable} from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export  class NotificationService  {
    constructor(public http: HttpClient) { }
	
    getAllNotifications(patientFilterModel) {
       return this.http.post(environment.serviceurl+'/admin/NotificationController/getNotifications',JSON.stringify(patientFilterModel)).map((res: any) => res);
    }
    getNotification(id)
    {
      return this.http.get(environment.serviceurl+'/admin/NotificationController/getnotification/'+id).map((res: any) => res);
    }

    getTopNotifications()
    {
		let par:HttpParams = new HttpParams().set("silentServerFetch", "1");
	
      return this.http.get(environment.serviceurl+'/admin/NotificationController/getTopNotifications/',{ params:par }).map((res: any) => res);
    }
    getObjectTypes()
    {
      return this.http.get(environment.serviceurl+'/admin/NotificationController/getAlertTypes/').map((res: any) => res);
    }
    downloadNotifications(data): Observable<any>{
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      return this.http.post(environment.serviceurl+'/admin/NotificationController/getNotificationsExport', JSON.stringify(data)).map(res => res)
  }
  getVehicles(){
    return this.http.get(environment.serviceurl+'/admin/VehicleController/getVehicleList').map((res:any)=> res);
}
}