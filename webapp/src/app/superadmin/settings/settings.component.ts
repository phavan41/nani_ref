import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TechnicalSettingsComponent } from "../technical-settings/technical-settings.component";
import { debuglog } from 'util';
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  showSettings:boolean = true;
  showtechnicalsettings: boolean = false;
  showlanguages: boolean = false;
  showMailTemplate: boolean = false;
  @ViewChild(TechnicalSettingsComponent)
  private technicalSettingsComponent: TechnicalSettingsComponent;
  constructor(private apphelper:AppHelper, public globals: Globals) { }
  ngOnInit() {
   // this.toggleSettings();
  }
  
  toggleSettingsMenu($event){
     this.showSettings = true;
     this.showtechnicalsettings = false;
   this.showlanguages = false;
   this.showMailTemplate = false;
   }
  
  toggleSettings(){
     this.showSettings = false;
     this.showtechnicalsettings = true;
     this.showMailTemplate = false;
   }
   toggleLanguages(){
    this.showSettings = false;
    this.showlanguages = true;
    this.showMailTemplate = false;
  }
  showHideMailTemplate(){
    this.showSettings = false;
    this.showlanguages = false;
    this.showMailTemplate = true;
  }
  
}
