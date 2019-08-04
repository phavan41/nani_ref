import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { pagingModel } from '../../mastercomponents/shareddata/entities/pagingModel';
import { DataTableModule } from '../../mastercomponents/ngbcomponents/datatable/datatable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { LanguageService } from "../../services/language.service";
import { UserAccountService } from "../../services/useraccount.service";
import { CountryService } from '../../services/countries.service';


import {search} from "../../models/search.model";
import {languageModel,languageValueModel} from "../../models/language.model";
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';

declare let toastr;

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})




export class LanguagesComponent implements OnInit {
  //#region Properties
  objectKeys = Object.keys;
    languages = [];
    languagedata = new languageModel();
    showLanguageGrid: boolean = true;
    showfilterPopUP: boolean = false;
    showCreateButton: boolean = true;
    paging: pagingModel = new pagingModel();
    totalRecords: number;
    languagelist = [];
    menus=[];
    @ViewChild('showfilterpopup') filterpopup;
    filterpopupwindow: NgbModalRef;
    @ViewChild('f') myfrm;
    @ViewChild('cd') cd;
  @Output() onCancel = new EventEmitter();
  //#endregion
  //#region Constructor
    constructor(private apphelper:AppHelper,  private _languageservice: LanguageService, private modalService: NgbModal,
      public globals: Globals) { }

    ngOnInit() {
      //this.getLanguageCodes();
      this.getMenus();
    }

  //#endregion

  //#region Methods
  
	cancelButtonClick(e){
		this.onCancel.emit(true);
	}

    getLanguageData(event,search=false,refresh=false) {
        if (this.paging == null)
          this.paging = new pagingModel();
        this.paging.pageSize = event.rows;
        this.paging.page = event.first;
        this.paging.sortBy = event.sortField;
        if (event.sortOrder == 1 || refresh==true) {
          this.paging.sortDirection = "desc";
        }
        else {
          this.paging.sortDirection = "asc";
        }
        if(refresh){
          this.paging.search={};
        }
        this._languageservice.getLanguages(this.paging).subscribe((response) => {
          //console.log(response);
          if (response.success) {
            this.languagelist = response.data;
            this.totalRecords = response.totalrecords;
            if(search){
              this.closepopup();
              
            }
          }
        });
      }

    getLanguageCodes() {
        // this._languageservice.getLanguageCodes().subscribe((response) => {
        //   if(response.success){
        //     this.languages = response.data;
        //   }
        // })
    }

    getLanguageValues() {
      this._languageservice.getLanguageValues().subscribe((response) => {
        if(response.success){
          this.languagedata = response.data;
        }
      })
    }

    submitForm(f: NgForm) {
      if(this.languagedata.id>0){
        this._languageservice.updateLanguageValue(this.languagedata).subscribe((response) => {
          if (response.success) {
            toastr.success(this.apphelper.parseMessageFromLanguage(response.message))
            this.toggleCreateLanguage();
          } else {
            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
          }
        }, (error) => {
          toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
        });
      }else{
        this._languageservice.addLanguageValue(this.languagedata).subscribe((response) => {
          if (response.success) {
            toastr.success(this.apphelper.parseMessageFromLanguage(response.message))
            this.toggleCreateLanguage();
          } else {
            toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
          }
        }, (error) => {
          toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
        });
      }
    }

    editLanguage(id: number) {
      this._languageservice.getLanguageKeybyid(id).subscribe((response) => {
        if (response.success) {
          this.languagedata=response.data;
          this.languagedata.lang_words=response.data.lang_words;
          if(this.languagedata.lang_words.length==0){
           this.generatelanguagemodel();
          }
          this.showCreateButton= false;
          this.showLanguageGrid=false;
        }
      });
    }

    getMenus() {
      this._languageservice.getMenuNames().subscribe((response) => {
        if(response.success){
          this.menus = response.data;
        }
      })
    }


  //#endregion

  //#region Events

    toggleCreateLanguage(){
      this.showLanguageGrid=!this.showLanguageGrid;
      if(this.showLanguageGrid){
        this.showCreateButton=true;
      }else{
        this.generatelanguagemodel();
      }
    }
    generatelanguagemodel()
    {
        this.languagedata = new languageModel();
        this.languagedata.lang_key= "";
        for (let i of this.languages) {
          let a = new languageValueModel();
          a.language_name = i.language_name;
          a.language_id = i.id;
          this.languagedata.lang_words.push(a);
        }
     
     }

    togglePopUp() {
        this.showfilterPopUP = !this.showfilterPopUP;
        if (this.showfilterPopUP){
          this.filterpopupwindow = this.modalService.open(this.filterpopup, {size: 'lg'});
        } else {
          this.filterpopupwindow.close();
        }
    }
    closepopup() {
			if (this.cd){
        this.cd.closepopupdt();
        	}
		}

    resetSearch() {
      this.paging.search={};
      this.getLanguageData(event);
      this.closepopup();
      }

  //#endregion

}
