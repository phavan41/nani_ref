export class Alert{
    object_type?:string;
    object_Id?:number;
    alertType_id?:string;
    emailAlerts?:EmailAlerts;
    smsAlerts?:SmsAlerts;
    webAlerts?:WebAlerts;
    webhookAlerts?:WebhookAlert;
    vehicle_ids:Array<number>;
    effective_from_date?:string;
    effective_to_date?:string;
    alert_type?:string;
    recordid?:number;
    constructor(){
        this.object_Id=null;
        this.alertType_id=null;
        this.emailAlerts=new EmailAlerts();
        this.smsAlerts=new SmsAlerts();
        this.webAlerts=new WebAlerts();
        this.webhookAlerts=new WebhookAlert(); 
        this.effective_from_date=null;
        this.effective_to_date=null;
        this.alert_type=null;
        this.object_type=null;
        this.vehicle_ids = new Array<number>();
        this.recordid = null;
    }
}
export class EmailAlerts{
    isEmailAlertChecked?:boolean=false;
    emails?:Array<string>;
    id?:number;
    constructor(){
        this.isEmailAlertChecked=false;
        this.emails=null;
        this.id=null;
    }
}
export class WebAlerts{
    isWebAlertChecked?:boolean=false;
    web?:Array<number>;
    id?:number;
    constructor(){
    this.isWebAlertChecked=false;
    this.web=null;
    this.id=null;
    }
}
/* export class Vehicles{
    
    registration_number?:string;
    id?:number;
    constructor(){
    this.registration_number=null;
    this.id=null;
    }
} */
export class SmsAlerts{
    isSmsAlertChecked?:boolean=false;
    sms?:Array<string>;
    id?:number;
    constructor(){
    this.isSmsAlertChecked=false;
    this.sms=null;
    this.id=null;
    }
}
export class WebhookAlert{
    isWebhookAlertChecked?:boolean=false;
    url?:string;
    id?:number;
    constructor(){
        this.url=null;
        this.isWebhookAlertChecked=false;
        this.id=null;
    }
}