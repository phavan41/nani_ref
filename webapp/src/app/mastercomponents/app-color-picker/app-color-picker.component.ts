import { Component, Optional, OnInit, Inject, ViewEncapsulation, 
  Input, Output, ViewChild, EventEmitter } from '@angular/core';
  
  import {
    NgModel,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS,
    NG_ASYNC_VALIDATORS,
  } from '@angular/forms';
  
  import {ElementBase, animations } from '../form';

@Component({
  selector: 'app-color-picker',
  templateUrl: './app-color-picker.component.html',
  styleUrls: ['./app-color-picker.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AppColorPickerComponent,
    multi: true,
  }]
})
export class AppColorPickerComponent extends ElementBase<string> implements OnInit {

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
	@Input() public describedby: string;
	@Input() public inputType: string = 'text';
	@Input() public inline: boolean = false;
	@Input() public prependIcon: string = '';
	@Input() public appendIcon: string = '';
	@Input() public disabled:boolean=false;
	@Input() public patternType:any;
	@Input() public dailogboxPositon:string = '';
	@Input() public format:string = '';
	textBoxDivCssClass:string = '';
	textBoxGroupCssClass:string = '';
	public color: string = '#2889e9';
	@Output() onClick = new EventEmitter();
	@Output() onFocus = new EventEmitter();
	@Output() onBlur = new EventEmitter();
	@Output() onChange = new EventEmitter();

	@ViewChild('field') model: NgModel;
	
  constructor(
	@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
  ) { 
	super(validators, asyncValidators);
  }
  ngOnInit() {
	  if (this.inline){
		this.labelCssClass = 'col-form-label col-' + this.labelColumns + ' ' + this.labelCssClass;
		this.textBoxDivCssClass = 'col-' + this.textBoxColumns;
	  }
	  
	  if (this.prependIcon.length > 0 && this.appendIcon.length > 0){
		  this.textBoxGroupCssClass = 'm-input-icon m-input-icon--left m-input-icon--right';
	  }
	  else if (this.prependIcon.length > 0){
		  this.textBoxGroupCssClass = 'm-input-icon m-input-icon--left';
	  }
	  else if (this.appendIcon.length > 0){
		  this.textBoxGroupCssClass = 'm-input-icon m-input-icon--right';
	  }
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
  
  fireChange(e){
	  this.onChange.emit(e);
  }
}
