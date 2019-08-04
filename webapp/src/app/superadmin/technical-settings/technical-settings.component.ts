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
import { TechnicalSettingsModel } from "../../models/technical-setting.model";
import { TechnicalSettingService } from "../../services/technical-setting.service";
import { DropzoneConfig } from '../../mastercomponents/dropzone/dropzone.interfaces';
import { environment } from '../../../environments/environment';
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';

declare let toastr;

@Component({
  selector: 'app-technical-settings',
  templateUrl: './technical-settings.component.html',
  styleUrls: ['./technical-settings.component.css'],
})
export class TechnicalSettingsComponent implements OnInit {

  technialSettings :TechnicalSettingsModel = new TechnicalSettingsModel();
  @ViewChild('f') myfrm;
  config : DropzoneConfig =  new DropzoneConfig();
  @Output() onCancel = new EventEmitter();
  constructor(private apphelper:AppHelper, private router: Router, private route: ActivatedRoute,
               private _technicalsettingsservice: TechnicalSettingService,
               public globals: Globals) {  }

  ngOnInit() {
    this.getAllTecnicalSettings();
    this.config.acceptedFiles = ".pem";
    this.config.addRemoveLinks = true;
    this.config.url = environment.serviceurl + '/Common/fileuploadtotemp';
  }

  getAllTecnicalSettings() {
    this._technicalsettingsservice.getAllSettings().subscribe((response) => {
      if (response.success) {
        this.technialSettings=response.data;
      }else {
        toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
      }
    });
  }

  submitForm(f: NgForm){
      if(this.myfrm.valid){
            this._technicalsettingsservice.updateSettings(this.technialSettings).subscribe((response) => {
              if (response.success) {
                toastr.success(this.apphelper.parseMessageFromLanguage(response.message))
              } else {
                toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
              }
            }, (error) => {
              toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
            });
       
        }else{
         this.myfrm.form.markAsTouched();
         toastr.warning(this.globals.switchLanguageValue['FILL_MANDATORY_FIELDS']);
       return false;
       }
  }

  cancelButtonClick(e){
	  this.onCancel.emit(true);
    //this.router.navigate(['../'],{relativeTo:this.route});
  }


}
