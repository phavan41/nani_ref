import { JsonPipe } from "@angular/common";

export class Notification {
    id:number;
    object_type : string;
    object_id :number;
    notifications_to :string;
    notification_modes : string;
    value1?:string;
    value2?:string;
    jsonvalues : JsonPipe;
    is_completed : boolean;
    status:string;
    created_ip:string;
    created_by:number;
    is_read:boolean;
    created_on?:string;
    constructor(){
        this.id = null;
        this.object_type = null;
		this.object_id = null;
        this.notifications_to =  null;
        this.notification_modes = null;
        this.value1 = null;
        this.value2 = null;
        this.jsonvalues = null;
        this.is_completed=null;
        this.status=null;
        this.created_ip = null;
        this.created_by = null;
        this.is_read = false;
        this.created_on=null;
        
    }
}