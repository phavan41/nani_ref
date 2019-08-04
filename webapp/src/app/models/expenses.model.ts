export class Expense{
    vehicle_id?:number;
    maintenance_date?:string;
    description?:string;
    amount?:number;
    registration_number?:string;
    constructor(){
        this.vehicle_id=null;
        this.maintenance_date=null;
        this.description=null;
        this.amount=null;
        this.registration_number = null;
    }
}