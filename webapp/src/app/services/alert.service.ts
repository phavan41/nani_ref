import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
@Injectable()
export class AlertService {

  constructor(public http: HttpClient) { }
  getAllAlerts(patientFilterModel) {
    return this.http.post(environment.serviceurl + '/admin/AlertsController/getAllAlerts', JSON.stringify(patientFilterModel)).map((res: any) => res);
  }
  getBusinessGroupsList() {
    return this.http.get(environment.serviceurl + '/admin/BusinessgroupController/getBusinessGroupsList').map(res => res);
  }
  getBusinessUnitList(id) {
    return this.http.get(environment.serviceurl + '/admin/BusinessgroupController/getBusinessUnitsList/' + id).map((res: any) => res);
  }
  getAlertTypes(){
    return this.http.get(environment.serviceurl + '/admin/AlertsController/getAlertTypes').map(res => res);
  }
  
  isSMSEnabledForBG(id){
    return this.http.get(environment.serviceurl + '/admin/BusinessgroupController/isSMSEnabledForBG/' + id).map(res => res);
  }
  
  getAlertById(id)
    {
      return this.http.get(environment.serviceurl+'/admin/AlertsController/getAlertById/'+id).map((res: any) => res);
    }

    statusChanged(data) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      return this.http.post(environment.serviceurl + '/admin/AlertsController/updateAlertStatus/', JSON.stringify(data)).map((res: any) => res);
  }

}
