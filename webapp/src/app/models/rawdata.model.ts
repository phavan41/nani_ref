export class Rawdata {
    id:number;
    imei_number : string;
    tracker_name :string;
    tracker_unique_id : number;
    registration_number : string;
    latitude : string
    longitude : string;
    speed : number;
    gps_datetime : string
    processing_date : string
    driver_name : string
    constructor(){
        this.id = null;
        this.imei_number = null;
		this.tracker_name = null;
        this.tracker_unique_id =  null;
        this.registration_number = null;
        this.latitude = null;
        this.longitude = null;
        this.speed = null;
        this.gps_datetime = null;
        this.processing_date = null;
        this.driver_name = null;
    }
}