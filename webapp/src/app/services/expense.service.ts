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
export  class ExpenseService {
    constructor(public http: HttpClient) { }
    getExpensesGrid(Paging:any) {
		return this.http.post(environment.serviceurl + '/admin/VehicleController/getAllVehicleExpense', JSON.stringify(Paging)).map((res: any) => res);
    }
    addExpense(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl + '/admin/VehicleController/addUpdateVehicleExpense', JSON.stringify(data)).map(res => res);
    }
    updateExpense(data): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.serviceurl + '/admin/VehicleController/addUpdateVehicleExpense', JSON.stringify(data)).map(res => res);
    }
    editExpenseById(id:number){
            return this.http.get(environment.serviceurl + '/admin/VehicleController/getVehicleExpenseById/' + id).map((res: any) => res);
    }
}