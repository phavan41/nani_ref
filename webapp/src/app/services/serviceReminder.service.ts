import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
@Injectable()
export class VehicleServiceReminderService {

  constructor(public http: HttpClient) { }
  getVehicleServiceReminderList(patientFilterModel) {
    return this.http.post(environment.serviceurl + '/admin/VehicleServiceReminderController/getAllVehicleServiceReminder', JSON.stringify(patientFilterModel)).map((res: any) => res);
  }
  
  
  getVehicleServiceReminderById(id)
    {
      return this.http.get(environment.serviceurl+'/admin/VehicleServiceReminderController/getVehicleSRById/'+id).map((res: any) => res);
    }
    deleteVehicleServiceReminderById(id)
    {
      return this.http.get(environment.serviceurl+'/admin/VehicleServiceReminderController/getDeleteVehicleSRById/'+id).map((res: any) => res);
    }
    addVehicleServiceReminder(data) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      return this.http.post(environment.serviceurl + '/admin/VehicleServiceReminderController/addUpdateVehicleServiceReminder', JSON.stringify(data)).map((res: any) => res);
  }
  updatVehicleServiceReminder(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(environment.serviceurl + '/admin/VehicleServiceReminderController/addUpdateVehicleServiceReminder', JSON.stringify(data)).map((res: any) => res);
  }

}
