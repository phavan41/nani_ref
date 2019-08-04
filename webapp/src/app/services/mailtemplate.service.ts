
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export  class MailTemplateSettingsService {
    constructor(public http: HttpClient) { }
    getCustomData(){
        return this.http.get(environment.serviceurl+'/Common/getCustomData').map((res:any) => res);
    }
   updateCustomData(data){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(environment.serviceurl+'/Common/updateCustomData', JSON.stringify(data)).map(res => res);
   }
   
   getCustomDataById(id:number){
    return this.http.get(environment.serviceurl+'/Common/getCustomDataById/'+id).map((res:any) => res);
   }
}