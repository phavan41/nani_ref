import { search } from "./search.model";

export class ScheduleReport {
    id?:number;
    report_type:string;
    report_params:search;
    schedule_type:number;
    recurring_type:number;
    recurring_params:any;
	schedule_date:string;
	schedule_time:string;
	effective_from:string;
	effective_to:string;
	recurring_frequency:number;
    constructor(){
        this.id = null;
        this.report_type = '';
        this.report_params = new search();
        this.schedule_type = null;
        this.recurring_type  = null;
		this.recurring_params  = null;
		this.schedule_date  = null;
		this.schedule_time  = null;
		this.effective_from  = null;
		this.effective_to = null;
		this.recurring_frequency = null;
    }
}
export class Time{
    hour:string ;
    minute:string;
    second:string;
    constructor(){
        this.hour = '';
        this.minute = '';
        this.second = '';
    }
    

}