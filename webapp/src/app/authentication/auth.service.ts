import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LoginModel } from './signin/signin.component'
import {AppSettings} from '../appSettings';
import { environment } from '../../environments/environment';

@Injectable()
export class CommonService {
    headers: any = {};
    constructor(public http: HttpClient) { }
    isLoggedIn = false;
    UserData:any={};

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    login(data): Observable<any> {
        return this.http.post(environment.serviceurl+'/Welcome/login', JSON.stringify(data)).map(res => res)
        //.catch('some Error');
    }

    logout():  Observable<any> {
        this.isLoggedIn = false;
        return this.http.get(environment.serviceurl+'/Common/logout').map(res=>res)
    }
    


    forgotData(data): Observable<any>{
        return this.http.post(environment.serviceurl+'/Forgot/forgotpassword', JSON.stringify(data)).map(res => res)
    }

    checkLogin():Observable<any>{
		//console.log('Check Login Called');
        return this.http.get(environment.serviceurl+'/Welcome/is_user_logged_in');
    }
	
	getUserModuleInfo():Observable<any>{
		//console.log('get Timezone Info Called');
        return this.http.get(environment.serviceurl+'/Common/getUserModuleInfo');
    }

    setUserData(data){
        this.UserData=data;        
    }

    IsSuperadmin():Observable<any>{
        return this.http.get(environment.serviceurl+'/Common/isSuperAdmin');
    }
    isMultiUserAccount():Observable<any>{
        return this.http.get(environment.serviceurl+'/Common/isMultiUserAccount');
    }
}
