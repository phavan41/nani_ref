import { accountModel } from "./accounts.model";
import { Roles } from "./roles.model";
import { Countries } from "./countries.model";
import { address } from './address.model';
import { UserAccounts } from './useraccounts.model';
import { businessGroup } from '../../models/businessgroup.model';
import { profile } from '../../models/profile.model';
import { businessUnit } from "../../models/businessunit.model";


export class User {
    id?: number;
    account_name: string;
    first_name: string;
    last_name: string;
    name: string;
    email: string;
    mobileno: string;
    dob: Date;
    status: number;
    address: address;
    is_superadmin: boolean;
    is_accountadmin: boolean;
    profile_path?: string;
    profile_pic_path?:string;
    set_language:number;
    time_zone_id:number;
    userAccounts: UserAccounts[];
    business_group_id: businessGroup[];
    business_unit_id:businessUnit[];
    profile_id: profile[];
    is_bgall?:number;
    role_id?:number;
    driver_id?:number;
    constructor() {
        this.account_name = null;
        this.first_name = null;
        this.last_name = null;
        this.name = null;
        this.email = null;
        this.mobileno = null;
        this.dob = null;
        this.status = null;
        this.address = new address();
        this.is_superadmin = false;
        this.is_accountadmin = false;
        this.profile_path = null;
        this.profile_pic_path=null;
        this.userAccounts = [];
        this.business_group_id = Array<businessGroup>();
        this.business_unit_id =Array<businessUnit>();
        this.profile_id = Array<profile>();
        this.is_bgall = null;
        this.role_id = null;
        this.driver_id = null;

    }
}

export interface Car {
    email;
    id;
    account_name;
    first_name;
    last_name;
    name;
    mobileno;
    status;
}