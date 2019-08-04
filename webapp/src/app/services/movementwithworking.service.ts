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
export  class MovementWithWorkingService {
    constructor(public http: HttpClient) { }
    
    getMovementWorkingWithInHoursReportExport(data){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      return this.http.post(environment.serviceurl + '/admin/ReportsController/movementWorkingHoursExport', JSON.stringify(data)).map((res: any) => res);
  }
    getMovementWorkingWithInHoursReport(Paging:any) {
      return this.http.post(environment.serviceurl + '/admin/ReportsController/movementWorkingHours', JSON.stringify(Paging)).map((res: any) => res);
      }
      getVehiclesList(data){
        let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/VehicleController/getActiveVehicles',JSON.stringify(data)).map((res:any)=> res);
      }
      getBusinessGroupList() {
        return this.http.get(environment.serviceurl + '/admin/BusinessgroupController/getBusinessGroupsList').map((res: any) => res);
    }
      getBusinessUnitList(data) {
    
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl + '/admin/BusinessgroupController/getBusinessUnitsListForReports/', JSON.stringify(data)).map((res: any) => res);
    }
}