import { Component, Optional, OnInit, Inject, ViewEncapsulation, 
Input, Output, ViewChild, EventEmitter,SimpleChanges } from '@angular/core';
import { isBoolean, isNil, isString } from 'lodash';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { MytreeviewPipe } from './mytreeview.pipe';

import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';

import {ElementBase, animations } from '../form';

@Component({
  selector: 'app-treedropdown',
  templateUrl: './app-treedropdown.component.html',
  styleUrls: ['./app-treedropdown.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AppTreedropdownComponent,
    multi: true,
  }]
})
export class AppTreedropdownComponent extends ElementBase<any> {
	@Input() public label: string;
	@Input() public identifier: string;
	@Input() public helpText: string;
	@Input() public cssClass: string;
	@Input() public labelCssClass: string = '';
	@Input() public labelColumns: number;
	@Input() public dropdownColumns: number;
	@Input() public name: string;
	@Input() public formGroupCssClass: string;
	@Input() public inline: boolean = false;
	@Input() public dropdownEnabled:boolean=false;
	dropdownDivCssClass:string = '';
	@Input() public options = [];
	@Input() public optionsValueField:string = 'value';
	@Input() public optionsTextField:string = 'text';
	@Input() public optionsChildrenField:string = 'children';
	@Input() public buttonClass:string = 'btn-secondary';
	@Input() public selectedValuesInArray:boolean = false;
	@Input() placeHolderText:string = "";
	
	items?: TreeviewItem[] = null;
    values: TreeviewItem[];
	valueChangeProg:boolean = false;
	
	
	@Output() onClick = new EventEmitter();
	@Output() onFocus = new EventEmitter();
	@Output() onBlur = new EventEmitter();
	@Output() onChange = new EventEmitter();

	@ViewChild('field') model: NgModel;
	
	public config:TreeviewConfig;

  constructor(
	@Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>,
	private treeviewPipe:MytreeviewPipe
  ) {
	super(validators, asyncValidators);
  }
  ngOnInit() {
	  //console.log("App Tree Dropdown Initialization");
	  if (this.inline){
		this.labelCssClass = 'col-form-label col-' + this.labelColumns + ' ' + this.labelCssClass;
		this.dropdownDivCssClass = 'col-' + this.dropdownColumns;
	  }
	  
	  this.config = TreeviewConfig.create({
		hasAllCheckBox: true,
		hasFilter: false,
		hasCollapseExpand: true,
		decoupleChildFromParent: true,
		maxHeight: 400
	});
	
	//console.log("App Tree Dropdown Initialization - Options");
	//console.log(this.options);
	
	this.items = this.treeviewPipe.transform(this.options, this.optionsTextField, this.optionsValueField, this.optionsChildrenField);
  }
  
  ngOnChanges(changes: SimpleChanges) {
	  //console.log("App Tree Dropdown changes");
	  //console.log(changes);
	  if (changes['options'] != undefined){
		  //console.log("App Tree Dropdown changes options");
		  //console.log(this.options);
		this.items = this.treeviewPipe.transform(this.options, this.optionsTextField, this.optionsValueField, this.optionsChildrenField);
		//console.log("App Tree Dropdown changes - ");
		//console.log(this.value);
		if (this.value != undefined && this.value != null){
			this.writeValue(this.value);
		}
	  }
  }
  
  fireChange(e){
	  this.onChange.emit(e);
  }
  
  writeValue(value: any) {
	super.writeValue(value);
	//console.log("App Tree Dropdown write Value");
	//console.log(value);
	
	if (value != null){
		let valueList = [];
		if (value instanceof Array){
			valueList = value;
		} else {
			if(value.length > 1){
				valueList = value.split(',').map(el => {
					let n = Number(el);
					return n;
				});
			}else{
				valueList.push(value);
			}
		}

		//console.log(valueList);
		this.valueChangeProg = true;
		this.selectItemsFromValues(this.items,valueList);
		this.items = [...this.items];
	} else {
		//console.log("App Tree Dropdown write Value no Selected Value, clearing selection");
		this.selectItemsFromValues(this.items,[]);
		this.items = [...this.items];
	}
  }
  
  selectItemsFromValues(itemList:TreeviewItem[],selectList:any[]){
	  //console.log("App Tree Dropdown selectItemsFromValues");
	  //console.log(itemList);
	  //console.log(selectList);
	itemList.forEach(itm => {
			if (selectList.find(x => (x === itm.value.value || x === itm.value.value.toString())) != undefined){
				itm.value.checked = true;
				itm.checked = true;
			} else {
				itm.value.checked = false;
				itm.checked = false;
			}
			
			if (itm[this.optionsChildrenField] != undefined && itm[this.optionsChildrenField] != null
			&& itm[this.optionsChildrenField].length > 0){
				this.selectItemsFromValues(itm[this.optionsChildrenField],selectList);
			}
		});
  }
  
  onFilterChange(value: string) {
	//console.log('filter:', value);
  }
  
  getSelection(items: TreeviewItem[]){
	let checkedItems:TreeviewItem[] = [];
	for (const item of items) {
        if (item.checked) {
			checkedItems.push(item.value);
		}
		if (!isNil(item.children) && item.children.length > 0) {
			checkedItems = [ ...checkedItems, ...this.getSelection(item.children)];
		}
    }
	return checkedItems;
  }
  
  selectionChanged(vals: any[]){
	  //console.log("App Tree Dropdown selection changed event");
	  //console.log(vals);
	  //console.log(this.value);
	  //console.log(this.items);
	 if (this.valueChangeProg == false){
		 this.values = this.getSelection(this.items);
		 
		 if (this.selectedValuesInArray){
			 this.value = this.values.map(o => o.value);
		 } else {
			this.value = this.values.map(o => o.value).join();
		 }
		 this.fireChange(this.value);
	 }
	 this.valueChangeProg = false;
  }
}
