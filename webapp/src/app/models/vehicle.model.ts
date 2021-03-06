import {contactModel} from  '../superadmin/models/contact.model'
export class vehicleModel {
    id?:number
    registration_number:string;
    engine_no:string;
    purchase_year:number;
    start_kms:number;
    odo_effective_from:Date;
    model:string;
    make:string;
    chassis_number:string;
    business_group_id:number;
    business_unit_id:number;
    tracker_id?:number;
    driver_id?:number;
    status:number;
    vehicle_photo?:string;
    contacts?:contactModel[];
    speed_limit?:number;
    is_hybrid?:boolean;
    deletedcontactidinfo:Array<Number>;
    registration_expirydate?:string;
    expiry_remainder:number;
    imei_number?:number;
    constructor()
    {	this.id=null;
        this.registration_number= null;
        this.engine_no= null;
        this.purchase_year= null;
        this.start_kms= null;
        this.odo_effective_from= null;
        this.model= null;
        this.make= null;
        this.chassis_number= null;
        this.business_group_id= null;
        this.business_unit_id= null;
        this.tracker_id= null;
        this.driver_id= null;
        this.status  = null;
        this.vehicle_photo=null;
        this.is_hybrid=false;
        this.contacts =  Array<contactModel>();
        this.registration_expirydate = null;
        this.expiry_remainder = null;
        this.imei_number = null;
    }
}
export class vehicleDriverHistory{
    id?:number;
    vehicle_id?:number;
    driver_id?:number;
    name?:string;
    business_group_id?:number;
    business_unit_id?:number;
    start_date?:string;
    end_date?:string;
    registration_number?:string;
    constructor(){
        this.id=null;
        this.name=null;
        this.driver_id=null;
        this.business_group_id=null;
        this.business_unit_id=null;
        this.start_date=null;
        this.end_date=null;
        this.vehicle_id=null;
        this.registration_number=null;
    }
}
export class vehicleTrackerHistory{
    id:number;
    tracker_unique_id:string;
    imei_number:number;
    start_date:string;
    end_date:string;
    tracker_name:string;
    constructor(){
        this.id=null;
        this.tracker_name=null;
        this.tracker_unique_id=null;
        this.start_date=null;
        this.end_date=null;
    }
}
export class trackerHistory{
    id?:number;
    business_group_id?:number;
    business_unit_id?:number;
    tracker_id?:number;
    constructor(){
        this.id=null;
        this.tracker_id=null;
        this.business_group_id= null;
        this.business_unit_id= null;
    }
}
export class TripVehicleSearch{
    label?:string;
    flag?:number;
    constructor(){
        this.label=null;
        this.flag=null;
    }
}