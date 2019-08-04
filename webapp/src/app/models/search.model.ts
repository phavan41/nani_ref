export class search {
     business_group_id?: number;
     business_unit_id?: number;
     location_type_id?: number;
     location_id?: number;
     status?:Array<number>;
     account_name?:string;
     contact_email?:string;
     country?:Array<number>;
     name?:string;
     role?:Array<number>;
	 license_validity?:string;
   	 driver_name?:string;
     registration_no?:string;
     vehicles_status?:Array<number>;
     menuids?:Array<number>;
     imei_number?:string;
     hardware_version ?: string;
     software_version ?: string;
     tracker_type ?:number;
     profile_id ?:number;
     manufacturer?:number;
     key?:string;
     value?:string;
     location?:string;
     driver?:string;
     trip_status?:Array<number>;
     to_date?:any;
     from_date?:any;
	 dateRangeLabel?:any;
     vehicle_name?:string;
     trips_start?:string;
     trips_end?:string;
     duration?:string;
     distance?:string;
     alertType?:Array<number>;
     objecttype?:string;
     manufacturer_id?:string;
     tracker_name?:string;
     unique_id?:number;
     registration_number?:string;
     vehicle_ids?:Array<number>;
     tracker_id?:number;
     current_date?:string;
     report_date?:string;
     start_hours?:string;
     end_hours?:string;
     logStreamName?:string;
     vehicle_id?:number;
     account_ids?:number;
     userslist?:number[];
     userType?:number;
     report_type?:string;
     schedule_type?:string;
     imeinumbers?:Array<string>;
     is_active?:number;
     export_type?:string;
     report_scheduler_id?:number;
}
export class Vehicle{
    flag:number;
    label:string;
    constructor(){
        this.flag = null;
        this.label = '';
    }
}
export class BusinessGroup{
    flag:number;
    label:string;
    constructor(){
        this.flag = null;
        this.label = '';
    }
}
export class TripSearch{
    trip_status?:Array<number>;
    from_date?: string;
    to_date?: string;
    dateRangeLabel?:string;
    constructor(){
        this.trip_status=null;
        this.from_date=null;
        this.to_date=null;
        this.dateRangeLabel = null;
    }
}
export class VehicleSearch{
    name?:string;
    business_group_id?: number;
    business_unit_id?: number;
    constructor(){
        this.name=null;
        this.business_group_id=null;
        this.business_unit_id=null;
    }
}
export class VehicleObj{
    id?:number;
    registration_number?:string;
    constructor(){
        this.id = null;
        this.registration_number = null;
    }
}
export class MarkereSearch{
    name?:string;
    business_group_id?: number;
    business_unit_id?: number;
    constructor(){
        this.name=null;
        this.business_group_id=null;
        this.business_unit_id=null;
    }
}