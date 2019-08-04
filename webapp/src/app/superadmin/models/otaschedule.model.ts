export class OTASchedule{
    id?:number;
    commands:string;
    schedule_date:string;
    schedule_time:string;
    imei_numbers:string;
  constructor(){
      this.id = null;
      this.commands = '';
      this.schedule_date = '';
      this.imei_numbers = '';
      this.schedule_time = '';
  }
}