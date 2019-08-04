import { address } from "./address.model";
import { businessUnit } from "./businessunit.model";
export class businessGroup {
    id : number;
    group_name :string;
    address_id : number;
    account_id : number;
    is_mastergroup : boolean;
    is_active : boolean;
    group_address?:address;
    business_units:businessUnit[];
    deletedBusinessUnits:Array<Number>;
    is_sms:boolean;
    parent_id:number;
    overspeed_back_off_time?:number;
    overspeed_initial_delay?:number;
    constructor(){
        this.id = null;
		this.group_name = null;
        this.address_id =  null;
        this.account_id =  null;
        this.is_mastergroup = false;
        this.is_sms = false;
        this.is_active = false;
        this.parent_id = null;
        this.overspeed_back_off_time = null;
        this.overspeed_initial_delay = null;
        this.group_address = new address();
        this.business_units = Array<businessUnit>();
    }
}