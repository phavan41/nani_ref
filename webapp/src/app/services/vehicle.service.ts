import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Paginator } from '../mastercomponents/ngbcomponents/paginator/paginator';

@Injectable()
export class VehicleService {
    constructor(public http: HttpClient) {
    }
    addViechicle(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl + '/admin/VehicleController/addUpdateVehicle', JSON.stringify(data)).map(res => res);
    }
    getVehicleGrid(Paging:any) {
		//let par:HttpParams = new HttpParams().set("silentServerFetch", "1");
		//return this.http.post(environment.serviceurl + '/admin/VehicleController/getVehicles', JSON.stringify(Paging),{ params:par }).map((res: any) => res);
		return this.http.post(environment.serviceurl + '/admin/VehicleController/getVehicles', JSON.stringify(Paging)).map((res: any) => res);
    }
    upateVechicle(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl + '/admin/VehicleController/addUpdateVehicle/', JSON.stringify(data)).map((res: any) => res);
    }
    statusChanged(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl + '/admin/VehicleController/updateVehicleStatus/', JSON.stringify(data)).map((res: any) => res);
    }
    getBusinessGroupList() {
        return this.http.get(environment.serviceurl + '/admin/BusinessgroupController/getBusinessGroupsList').map((res: any) => res);
    }
    getBusinessUnitList(id) {
        return this.http.get(environment.serviceurl + '/admin/BusinessgroupController/getBusinessUnitsList/' + id).map((res: any) => res);
    }
    getVehicleById(id: number) {
        return this.http.get(environment.serviceurl + '/admin/VehicleController/getVehiclebyID/' + id).map((res: any) => res);
    }
    getDownloadVehicle(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl + '/admin/VehicleController/vehicleExport', JSON.stringify(data)).map((res: any) => res);
    }
    getStatusId(id: number) {
        return this.http.get(environment.serviceurl + '/admin/VehicleController/getVehiclebyID/' + id).map((res: any) => res);
    }
    getUnassignedDriver(){
        return this.http.get(environment.serviceurl+'/Common/getUnassignedDriver/').map((res: any) => res);
    }
	getUnassignedDriverEditVehicle(data){
        return this.http.post(environment.serviceurl+'/Common/getUnassignedDriverForEditVehicle', JSON.stringify(data)).map((res: any) => res);
    }
	
    getUnassignedTracker(){
        return this.http.get(environment.serviceurl+'/Common/getUnassignedTracker/').map((res: any) => res);
    }
    assignDriverToVehicle(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/VehicleController/AssignDrivertoVehicle', JSON.stringify(data)).map(res => res);
    }
    assignTrackerToVehicle(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/VehicleController/AssignTrackertoVehicle', JSON.stringify(data)).map(res => res); 
    }
    getVechicleDriverHistory(id:number){
        return this.http.get(environment.serviceurl + '/admin/VehicleController/getVehicleHistory/' + id).map((res: any) => res);
    }
    getVechicleTrackerHistory(id:number){
        return this.http.get(environment.serviceurl + '/admin/VehicleController/getVehicleTraHistory/' + id).map((res: any) => res);
    }
    getUnassignedDrivers(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/Common/getUnassignedDriver/',  JSON.stringify(data)).map((res: any) => res);
    }
    unAssignTracker(id:number){
        return this.http.get(environment.serviceurl + '/admin/VehicleController/unAssignTracker/' + id).map((res: any) => res);
    }
    unAssignDriver(id:number){
        return this.http.get(environment.serviceurl + '/admin/VehicleController/unAssignDriver/' + id).map((res: any) => res);
    }
    getUnassignedTrackers(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/Common/getUnassignedTracker/',  JSON.stringify(data)).map((res: any) => res);
    }
    getAlertTypes(data){
        let headers=new Headers();
        headers.append('Content-Type','application/json');
        let options=new RequestOptions({headers:headers});
        return this.http.post(environment.serviceurl+'/admin/VehicleController/getAlertTypesforVehicle', JSON.stringify(data)).map((res:any)=>res);
    }
   
    getAlerts(data){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    let options=new RequestOptions({headers:headers});
    return this.http.post(environment.serviceurl+'/Common/getAllAlertConfigs', JSON.stringify(data)).map((res:any)=>res);
    }
    addAlertsToVehicle(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/Common/addAlertConfigs',  JSON.stringify(data)).map((res: any) => res);
       
    }
    getAlertConfigById(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/Common/getAlertConfigById',  JSON.stringify(data)).map((res: any) => res);
       
    }
    deleteAlertConfigById(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/Common/deleteAlertConfig',  JSON.stringify(data)).map((res: any) => res);
    }
    updateAlertConfigById(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/Common/updateAlertConfigs',  JSON.stringify(data)).map((res: any) => res);
        
    }
    getUsersData(business_group_id){
        return this.http.get(environment.serviceurl + '/admin/UserController/getAccountUsers/' + business_group_id).map((res: any) => res);
    }
    updateAdminSpeedimit(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/VehicleController/speedLimitUpdate', JSON.stringify(data)).map(res => res);  
    }
    
    updatedVehicleLock(data): Observable<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/VehicleController/updateVehicleIsLock', JSON.stringify(data)).map(res => res);  
    }
    sendCommandToVehicle(data): Observable<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/TrackersController/outGoingMessagesCommand', JSON.stringify(data)).map(res => res);  
    }
    uploadVehiclesFromExcel(data): Observable<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/VehicleController/bulkUploadVehicleData', JSON.stringify(data)).map(res => res);  
    }
    addODOMeterCommand(data): Observable<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/VehicleController/addODOMeterCommand', JSON.stringify(data)).map(res => res);  
    }
    onVehiclesSelectedForActions(data): Observable<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl+'/admin/VehicleController/checkAllVehiclesInactive', JSON.stringify(data)).map(res => res);  
    }
    deleteVehicleById(id:number){
        return this.http.get(environment.serviceurl + '/admin/VehicleController/deleteVehicle/' + id).map((res: any) => res);
    }
    
   
}