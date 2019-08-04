import { Component, OnInit,AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Globals } from '../../globals/global';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './app-datatable.component.html',
  styleUrls: ['./app-datatable.component.css']
})
export class AppDatatableComponent implements OnInit,AfterViewInit {
  @Input() public showHeader:boolean = true;
  @Input() public showGridControls:boolean = true;
  @Input() public showFilter:boolean = true;
  @Input() public showRefresh:boolean = true;
  @Input() public showPrint:boolean = true;
  @Input() public showDownload:boolean = true;
  @Input() public showDownloadExcel:boolean = true;
  @Input() public showDownloadPDF:boolean = true;
  @Input() public filterWidth:string = "300px";
  @Input() public exportSubMenuWidth:string = "300px";
  @Input() public filterText:string = "Filter";

  @Output() onFilterClick = new EventEmitter();
  @Output() onRefreshClick = new EventEmitter();
  @Output() onPrintClick = new EventEmitter();
  @Output() onExportExcelClick = new EventEmitter();
  @Output() onExportPDFClick = new EventEmitter();
  @Output() onSearchClick = new EventEmitter();
  @Output() onClearClick = new EventEmitter();
  @Output() onResetClick = new EventEmitter();
  @Output() onCreated = new EventEmitter();
  
  @ViewChild('cd') cd;
  @ViewChild('cdd') cdd;

  constructor(private globals: Globals) { }

  ngOnInit() {
  }
  
  ngAfterViewInit(){
	this.onCreated.emit({source: this});
  }

  filterClick(e){
    this.onFilterClick.emit(e);
  }

  refreshClick(e){
    this.onRefreshClick.emit(e);
  }

  printClick(e){
    this.onPrintClick.emit(e);
  }

  exportExcelClick(e){
    this.closepopupdtdownload();
    this.onExportExcelClick.emit(e);
  }

  exportPDFClick(e){
    this.closepopupdtdownload();
    this.onExportPDFClick.emit(e);
  }

  searchClick(e){
    this.onSearchClick.emit(e);
  }

  resetClick(e){
    this.onResetClick.emit(e);
  }

  closepopupdt() {
		if (this.cd) {
			this.cd.hide();
		}
  }
  
  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    //console.log(event.key);
	this.closepopupdt();
  }
  
  closepopupdtdownload() {
		if (this.cdd) {
			this.cdd.hide();
		}
	}

  clearClick(e){
    this.closepopupdt();
    this.onClearClick.emit(e);
  }
}
