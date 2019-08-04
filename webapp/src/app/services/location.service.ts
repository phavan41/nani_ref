import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http'
import { HttpClientModule } from '@angular/common/http';
 import { HttpModule } from '@angular/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

@Injectable()
export class LocationService {
    headers: any = {};
    constructor(public http: HttpClient) { }

    addLocation(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/LocationController/addLocation', JSON.stringify(data)).map(res => res);
    }
    updateLocation(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/LocationController/updateLocation', JSON.stringify(data)).map(res => res);
    }
    getLocationById(id:number){
        return this.http.get(environment.serviceurl+'/admin/LocationController/getLocationById/'+id).map((res: any) => res);
    }
    deleteLocation(id:number){
        return this.http.get(environment.serviceurl+'/admin/LocationController/deleteLocation/'+id).map((res: any) => res);
    }
    getAllLocations(){
        return this.http.get(environment.serviceurl+'/admin/LocationController/locationList').map(res => res);
    }
    getBusinessUnit(){
        return this.http.get(environment.serviceurl+'/Common/getAllBusinessUnitList').map((res:any) => res);
    }
    getLocationTypes(){
        return this.http.get(environment.serviceurl+'/Common/getLocationTypes').map((res:any) => res);
    }
    getLocationsAll(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/LocationController/locationSearch', JSON.stringify(data)).map((res: any) => res);  
    }
    addMapLocation(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/LocationController/addGeoCoordinates', JSON.stringify(data)).map(res => res);
    }
    updateBoundary(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/LocationController/updateGeoCoordinates', JSON.stringify(data)).map(res => res);
    }
    getAllGeoCoordinates(data){
        return this.http.post(environment.serviceurl+'/admin/LocationController/getGeoCoordinates', JSON.stringify(data)).map((res:any) => res);
    }
    getAlertTypes(data){
        let headers=new Headers();
        headers.append('Content-Type','application/json');
        let options=new RequestOptions({headers:headers});
        return this.http.post(environment.serviceurl+'/admin/LocationController/getAlertTypesforLocation', JSON.stringify(data)).map((res:any)=>res);
    }
    addAlertsToLocation(data){
       
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let options = new RequestOptions({ headers: headers });
            return this.http.post(environment.serviceurl+'/admin/AlertsController/addAlertConfigs',  JSON.stringify(data)).map((res: any) => res);
           
       
    }
    getAlertConfigById(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/AlertsController/getAlertConfigById',  JSON.stringify(data)).map((res: any) => res);
       
    }
    updateAlertConfigById(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/AlertsController/updateAlertConfigs',  JSON.stringify(data)).map((res: any) => res);
        
    }
    getAlerts(data){
        let headers=new Headers();
        headers.append('Content-Type','application/json');
        let options=new RequestOptions({headers:headers});
        return this.http.post(environment.serviceurl+'/admin/AlertsController/getAllAlertConfigs', JSON.stringify(data)).map((res:any)=>res);
    }
    deleteAlertConfigById(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/AlertsController/deleteAlertConfig',  JSON.stringify(data)).map((res: any) => res);
    }
    getVehiclesList(){
        return this.http.get(environment.serviceurl+'/admin/VehicleController/getVehicleList').map((res:any)=> res);
    }
    geoLocationsuploadFromExcel(data): Observable<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/LocationController/bulkUploadLocationData', JSON.stringify(data)).map(res => res);  
    }
}
