import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Globals } from '../../globals/global';
import { MailTemplateSettingsService } from '../../services/mailtemplate.service';
import { AppHelper } from '../../apphelper';
import { NgForm } from '@angular/forms';

declare let toastr;

@Component({
  selector: 'app-mailtemplatesettings',
  templateUrl: './mailtemplatesettings.component.html',
  styleUrls: ['./mailtemplatesettings.component.css']
})
export class MailtemplatesettingsComponent implements OnInit {

  @ViewChild('f') myfrm;
  contentType:string;
  showTextArea:boolean = false;
  contentData:any ;
  content_Types:any =[];
  @Output() onCancel = new EventEmitter();
  constructor( public globals: Globals, private _mailtemplateService:MailTemplateSettingsService, 
    private apphelper:AppHelper) { }
    editorConfig = {
      editable: true,
      spellcheck: false,
      height: '190px',
      minHeight:'190px',
      width: '750px',
      placeholder: 'Type something. Test the Editor... ヽ(^。^)丿',
      translate: 'no'
    };
  ngOnInit() {
    this.getCustomData();
  }
  cancelButtonClick(){
		this.onCancel.emit(true);
  }
  submitForm(f:NgForm){
    if (f.valid) {
      //console.log(this.contentType+"=="+this.contentData);
    let data:any={"content_type_id":this.contentType,"content":this.contentData};
    this._mailtemplateService.updateCustomData(data).subscribe((response:any) => {
      if(response.success){
        this.cancelButtonClick();
        toastr.success(this.apphelper.parseMessageFromLanguage(response.message));
      }
      else{
        toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
      }
    },(error) => {
      toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
    });
  }else {
    f.form.markAsTouched();
    toastr.warning(this.globals.switchLanguageValue['FILL_MANDATORY_FIELDS']);
    return false;
  }
  }
  getCustomData(){
    this._mailtemplateService.getCustomData().subscribe((response:any) => {
      if(response.success){
        this.content_Types = response.data;
      }
      else{
        toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
      }
    },(error) => {
      toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
    });
  }
  
  showTextAreaFeature(id){
    this._mailtemplateService.getCustomDataById(id).subscribe((response:any) => {
      if(response.success){
        this.showTextArea = true;
        this.contentData = response.data.content;
      }
      else{
        toastr.warning(this.apphelper.parseMessageFromLanguage(response.message));
      }
    },(error) => {
      toastr.warning(this.globals.switchLanguageValue['SOMETHING_WRONG'], error);
    });
  }
  
}
