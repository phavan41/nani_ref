import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient,HttpParams} from '@angular/common/http'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import {AppSettings} from '../appSettings'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { pagingModel } from "../mastercomponents/shareddata/entities/pagingModel";
@Injectable()

export  class MapService {
    constructor(public http: HttpClient) {
        
     }

    getLocations(paging){
            return this.http.post(environment.serviceurl + '/admin/LocationController/getLocations', JSON.stringify(paging)).map((res: any) => res);
    }
    getTrackerList(){
        return this.http.get(environment.serviceurl+'/admin/TrackersController/getTrackersList').map((res:any)=> res);
    }
    getLocationList(){
        return this.http.get(environment.serviceurl+'/admin/LocationController/locationList').map((res:any)=> res);
    }
    getTripsLocation(id:number){
        return this.http.get(environment.serviceurl + '/admin/TripsController/getTripsByLocationId/' + id).map((res: any) => res);
    }
    getVehicleTripsLocation(id:number,silentRefresh:boolean = false){
		if (silentRefresh){
			let par:HttpParams = new HttpParams().set("silentServerFetch", "1");
			return this.http.get(environment.serviceurl+'/admin/TrackersController/getTripInforamtion/'+id,{ params:par }).map((res:any)=>res);
		} else {
			return this.http.get(environment.serviceurl+'/admin/TrackersController/getTripInforamtion/'+id).map((res:any)=>res);
		}
	}
    getTripsByVehicle(){
        return this.http.get(environment.serviceurl+'/admin/TripsController/getTripsByVehicle').map((res:any)=> res);
    }
    getVehicles(){
        return this.http.get(environment.serviceurl+'/admin/VehicleController/getVehicleList').map((res:any)=> res);
    }
    getBusinessGroupsList(){
        return this.http.get(environment.serviceurl+'/admin/BusinessgroupController/getBusinessGroupsList').map(res => res);
    }
    getBusinessUnitList(id){
        return this.http.get(environment.serviceurl+'/admin/BusinessgroupController/getBusinessUnitsList/'+id).map((res:any) => res);
    }
    getCurrentVehicles(data) {
        return this.http.post(environment.serviceurl+'/admin/VehicleController/getCurrentVehicles',JSON.stringify(data)).map((res:any) => res);
    }
    getCurrentTrips(data){
        return this.http.post(environment.serviceurl+'/admin/TripsController/currentTrips',JSON.stringify(data)).map((res:any) => res);
    }
    /* getCurrentVehicleById(id){
       return this.http.get(environment.serviceurl+'/admin/VehicleController/getCurrentVehicleById/'+id).map((res:any) => res);
    } */
    getAutoRefreshData(){
        return this.http.get(environment.serviceurl+'/Common/userVariablesforMapView').map((res:any) => res);
    }
    getTimeIntervalData(){
        return this.http.get(environment.serviceurl+'/Common/getAutoRefreshIntervals').map((res:any) => res);
    }
    addUpadateAutoRefreshData(data) {
		let par:HttpParams = new HttpParams().set("silentServerFetch", "1");
        return this.http.post(environment.serviceurl+'/Common/addUpdateUserVariables',JSON.stringify(data),{ params:par }).map((res:any) => res);
    }
    getIntervalTime(){
		let par:HttpParams = new HttpParams().set("silentServerFetch", "1");
        return this.http.get(environment.serviceurl+'/Common/getUserIntervalAutoRefresh',{ params:par }).map((res:any) => res);
    }
    getLocationPOIById(id:number){
        return this.http.get(environment.serviceurl+'/admin/LocationController/getPOIGeoFenceLocationData/'+id).map((res:any) => res);
    }
    getAddressFromTripStartAndEnd(data){
        return this.http.post(environment.serviceurl+'/Common/getReverseGeoCode',JSON.stringify(data)).map((res:any) => res);
    }
}