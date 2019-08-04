import * as moment from 'moment-timezone';
export class SelectedRange {
    start?: moment.Moment;
     end?: moment.Moment;
     startDate?:string ='';
      endDate?:string= '';
    
    constructor(){
     this.startDate = '';
     this.endDate = '';
    }
}