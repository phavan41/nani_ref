import {
    Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, Input, forwardRef, ViewEncapsulation, ChangeDetectorRef
} from '@angular/core';


import { NgModel,NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControl} from '@angular/forms';
import { AppDaterangepickerDirective } from './app-daterangepicker.directive';

import * as moment from 'moment-timezone';

@Component({
	selector: 'app-datepickerrange',
	templateUrl: './app-datepickerrange.component.html',
	styleUrls: ['./app-datepickerrange.component.css'],
	encapsulation: ViewEncapsulation.None,
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => AppDatepickerrangeComponent),
		multi: true
	}]
})

export class AppDatepickerrangeComponent implements OnInit {
	@Input() public label: string;
	@Input() public placeholder: string;
	@Input() public identifier: string;
	@Input() public helpText: string;
	@Input() public cssClass: string;
	@Input() public labelCssClass: string = '';
	@Input() public labelColumns: number;
	@Input() public textBoxColumns: number;
	@Input() public name: string;
	@Input() public formGroupCssClass: string;
	@Input() public inline: boolean = false;
	@Input() public setDisabled:boolean=false;
	@Input() public timePicker:boolean=false;
	@Input() public timePicker24Hour:boolean=false;
	@Input() public locale:any = {applyLabel: 'ok', format: 'MM/DD/YYYY HH:mm:ss'};
	textBoxDivCssClass:string = '';
	@Input() public opens:string = 'left';
	
	@Output() onClick = new EventEmitter();
	@Output() onFocus = new EventEmitter();
	@Output() onBlur = new EventEmitter();
	@Output() onChange = new EventEmitter();
	
	private changed = new Array<(value: any) => void>();
	private touched = new Array<() => void>();

	@ViewChild('field') model;
	@ViewChild(AppDaterangepickerDirective) innerDateRangePicker: AppDaterangepickerDirective;
	private innerValue: any;
	
	@Input() public ranges:any={
			  'Today': [moment().startOf('day'), moment().endOf('day')],
			  'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
			  'Last 7 Days': [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
			  'Last 30 Days': [moment().subtract(29, 'days').startOf('day'), moment().endOf('day')],
			  'This Month': [moment().startOf('month').startOf('day'), moment().endOf('month').endOf('day')],
			  'Last Month': [moment().subtract(1, 'month').startOf('month').startOf('day'), moment().subtract(1, 'month').endOf('month').endOf('day')]
			};
	
	@Input() public timeZone:string = '';
	
	constructor(){
	}
	
	ngOnInit() {
		if (this.inline){
			this.labelCssClass = 'col-form-label col-' + this.labelColumns + ' ' + this.labelCssClass;
			this.textBoxDivCssClass = 'col-' + this.textBoxColumns;
		}
		var that=this;
		this.innerDateRangePicker.onChange.asObservable().subscribe((range: any) => {
		  that.fireChange(range);
		});
	}
	
	clear(){
		this.innerDateRangePicker.clear();
	}

	fireClick(e){
		this.onClick.emit(e);
	}

	fireFocus(e){
		this.onFocus.emit(e);
	}

	fireBlur(e){
		this.onBlur.emit(e);
	}
	
	fireIconClick(){
		this.innerDateRangePicker.open();
	}

	fireChange(e){
		this.onChange.emit(e);
	}
	
	writeValue(value) {
		this.innerValue = value;
		this.innerDateRangePicker.writeValue(value);
		if (value == null){
			this.clear();
		}
	}
	
	get value(): any {
		//console.log("Get Value Called - " + this.innerValue);
		return this.innerValue;
	}

	set value(value: any) {
		//console.log("Set Value Called - " + this.innerValue + " - " + value);
		if (this.innerValue !== value) {
			//this.innerValue = value;
			//this.innerDateRangePicker.writeValue(value);
			this.changed.forEach(f => f(value));
		}
	}
	
	registerOnChange(fn) {
		//this._onChange = fn;
		this.changed.push(fn);
	}
	registerOnTouched(fn) {
		//this._onTouched = fn;
		this.touched.push(fn);
	}

	touch() {
		//console.log("Touch Called");
		this.touched.forEach(f => f());
	}
}