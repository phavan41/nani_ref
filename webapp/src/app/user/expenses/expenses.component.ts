import { Component, OnInit, AfterViewInit, ViewChild,ViewChildren, ElementRef, QueryList,ContentChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { Globals } from '../../globals/global';
import { DataTableModule } from '../../mastercomponents/ngbcomponents/datatable/datatable';
import { DataTable } from '../../mastercomponents/ngbcomponents/datatable/datatable';

import { VehicleService } from '../../services/vehicle.service';
import { NgForm } from '@angular/forms';
import { Expense } from '../../models/expenses.model';
import { ExpenseService } from '../../services/expense.service';
import { AppHelper } from '../../apphelper';
import { search } from '../../models/search.model';


declare let toastr;

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit,AfterViewInit  {

  pageData :pagingModel =  new pagingModel();
  @ViewChild('showExpensesPopup') showExpensesPopup;
  showExpensesPopupwindow: NgbModalRef;
  @ViewChild('addExpensespopup') addExpenses;
  addExpensesPopupwindow: NgbModalRef;
  expense:Expense = new Expense();
  showAlertTable:boolean=true;
  showAddExpenses:boolean=false;
  showLocationAlertsTable:boolean=false;
  showAlertUpdateButton:boolean=false;
  showform: boolean = false;
  alertTypeData:any;
  closePopup:boolean = false;
  
  @ViewChild('vehicleExpenses') vehicleExpenses;
  @ViewChild('cd') set cdNew(elRef: ElementRef){
	  if (elRef != undefined || this.closePopup){
		this.cd = elRef;
	  }
  }
  
  @ViewChild('expensesDT') set content(elRef: ElementRef){
	  if (elRef != undefined || this.closePopup){
		this.expensesDT = elRef;
	  }
  }
  
  cd:any;
  expensesDT:any;
  
  object_Id:number;
  object_type:string;
  location_name:string;
    alertpopuptype:string;
    paging: pagingModel = new pagingModel();
    vehicleExpenseList:any;
    totalRecords:any;
    editMode:boolean = false;
    showUpdateButton:boolean = false;
    accountcurrency:any;
  constructor(private modalService: NgbModal, public globals: Globals,
  private _expenseService: ExpenseService, private apphelper:AppHelper) { }

  ngOnInit() {
  }
  ngAfterViewInit()
  {
  }
  registration_number:string;
  showExpensesGrid(vehicle_id:number,registration_number:string){
    this.object_Id=vehicle_id;
    this.registration_number = registration_number;
    this.location_name=name;
    //console.log(vehicle_id);
   // this.getAlertsLocationById();
    this.showLocationAlertsTable = true;
	
  if (this.showLocationAlertsTable){
	  this.closePopup = false;
    this.showExpensesPopupwindow = this.modalService.open(this.showExpensesPopup, {size: 'lg',backdrop  : 'static', keyboard  : true});
  } else {
    this.closePopup = true;
    this.paging.search = new search();
    this.registration_number = null;
	this.showExpensesPopupwindow.close();
  }
  }
  closeExpensesPopup(){
    this.closePopup = true;
    this.paging.search = new search();
    this.registration_number = null;
    this.showExpensesPopupwindow.close();
  }
  
  onTableCrated(event){
	  if (event && event.source && !this.cd){
			this.cd = event.source;
		}
  }
  
  getAllExpenses(event, obj, search = false, refresh = false) {
		//console.log("Get All Expenses Called");
		//console.log(obj);
		
		if (event && event.source && !this.expensesDT){
			this.expensesDT = event.source;
		}
		
		if (this.paging == null)
			this.paging = new pagingModel();
		this.paging.pageSize = event.rows;
		this.paging.page = event.first;
		this.paging.sortBy = event.sortField;
		if (event.sortOrder == 1 || refresh == true) {
		this.paging.sortDirection = "desc";
		}
		else {
			this.paging.sortDirection = "asc";
		}
		 if (refresh) {
		 	this.paging.search = {};
    }
    this.paging.search.registration_number=this.registration_number;
		this._expenseService.getExpensesGrid(this.paging).subscribe((response: any) => {
			if (response.success) {
				this.vehicleExpenseList = response.data;
        this.totalRecords = response.totalrecords;
        this.accountcurrency = response.accountcurrency;
				
				/* if (search) {
					this.closepopup();
				} */
			}
		else {
      toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
      this.paging.search = {};
    this.registration_number = null;
    }
  }, (error) => {
    toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
  });
	}
    addExpensesPopup(){
      //this.alertpopuptype=type;
      this.expense = new Expense();
      this.showAddExpenses = true;
      //this.showAlertUpdateButton=false;
      this.showUpdateButton = false;
      if (this.showAddExpenses){
        this.addExpensesPopupwindow = this.modalService.open(this.addExpenses, {size: 'lg',backdrop  : 'static', keyboard  : true});
        this.showExpensesPopupwindow.close();
      } else {
        this.addExpensesPopupwindow.close();
      }
    }
    closeaddExpensesPopup(){
      this.expense = new Expense();
      this.paging.search = new search();
      this.addExpensesPopupwindow.close();
      this.showExpensesPopupwindow = this.modalService.open(this.showExpensesPopup, {size: 'lg',backdrop  : 'static', keyboard  : true});
    }
   
    addExpensesForVehicle(f:NgForm) {
      f.form.markAsTouched();
      if (f.valid) {
        if (this.editMode) {
         this.expense.vehicle_id = this.object_Id;
         this.expense.registration_number = this.registration_number;
          this._expenseService.updateExpense(this.expense).subscribe((response) => {
            if (response.success) {
              toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
              this.refreshDataTable();
              this.addExpensesPopupwindow.close();
              this.showUpdateButton = false;
             
            } else {
              toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
            }
          }, (error) => {
            toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
          });
        }
        else {
          this.expense.vehicle_id = this.object_Id;
         this.expense.registration_number = this.registration_number;
          this._expenseService.addExpense(this.expense).subscribe((response) => {
            if (response.success) {
              toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
              this.refreshDataTable();
              this.addExpensesPopupwindow.close();
              this.showUpdateButton = true;
            } else {
              toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
            }
          }, (error) => {
            toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
          });
        }
        this.editMode = false;
      } 
      
      else {
        f.form.markAsTouched();
        toastr.warning(this.globals.switchLanguageValue['FILL_MANDATORY_FIELDS']);
        return false;
      }
      this.editMode = false;
    }
    editExpenseById(id: number) {
      this.editMode = true;
      this._expenseService.editExpenseById(id).subscribe((response) => {
        if (response.success) {
          this.expense = response.data;
          this.showUpdateButton = true;
          this.showAddExpenses = true;
      if (this.showAddExpenses){
        this.addExpensesPopupwindow = this.modalService.open(this.addExpenses, {size: 'lg',backdrop  : 'static', keyboard  : true});
        this.showExpensesPopupwindow.close();
      } else {
        this.addExpensesPopupwindow.close();
      }
        }else {
          toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
        }
      }, (error) => {
        toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
      });
  
    }
    onSearchClicked(event){
		if (this.expensesDT){
			this.expensesDT.setFirstPageAndRefreshData();
		}
      if (this.cd){
        this.cd.closepopupdt();
      }
    }
    resetSearch(event) {
      this.paging.search = {};
	  if (this.expensesDT){
		this.expensesDT.setFirstPageAndRefreshData();
      }
	  this.closepopup();
    }
    refreshDataTable(){
    //console.log(this.expensesDT);
   
      if (this.expensesDT){
		this.expensesDT.refreshData();
	  }
    }
    closepopup() {
      if (this.cd){
        this.cd.closepopupdt();
      }
    }
    ngOnDestroy(){
      this.paging.search = new search();
      this.registration_number = null;
    }
}
