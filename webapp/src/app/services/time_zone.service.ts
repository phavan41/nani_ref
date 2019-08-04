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
export  class TimeZoneService {
    constructor(public http: HttpClient) { }

    getTimeZones(){
        return this.http.get(environment.serviceurl+'/common/getAllTimeZone').map((res: any) => res);
    }

    setTimeZone(id:number){
        return this.http.get(environment.serviceurl+'/common/setUserTimezone/'+id).map((res: any) => res);
        
    }
}