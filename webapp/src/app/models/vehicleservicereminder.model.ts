export class VehicleServiceReminder{
    id?:number;
    vehicle_id:number;
    interval_type:string;
    interval:number;
    last_service_date:string;
    next_service_date:string;
    reminder_days:number;
    odo_value:number;
    on_timeperiod:boolean;
    on_odometer:boolean;
    constructor(){
        this.vehicle_id = null;
        this.interval_type = '';
        this.interval = null;
        this.last_service_date = '';
        this.next_service_date = '';
        this.reminder_days = null;
        this.odo_value = null;
        this.on_timeperiod = false;
        this.on_odometer = false;
    }
}