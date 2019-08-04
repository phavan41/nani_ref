import { NgModule,Optional, SkipSelf,ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation'

import { MasterControlsRoutingModule } from './master-controls.routing.module';

import { MasterComponent } from './master.component';
import { MasterControlPageComponent } from './master-control-page/master-control-page.component';
import { HeaderComponent } from './layout/nav.header.component';
import { MenuComponent } from './layout/nav.menu.component';

import { HexadecimalValueValidator } from './validators';
import {MinLengthArrayValidator} from './validators';
import { ValidationComponent } from './validators';
import { RegExValidator } from './validators';

import { AppButtonComponent } from './app-button/app-button.component';
import { AppInputTextComponent } from './app-inputtext/app-inputtext.component';
import { AppTextboxComponent } from './app-textbox/app-textbox.component';
import { AppTextboxmaskedComponent } from './app-textboxmasked/app-textboxmasked.component';
import { AppTextareaComponent } from './app-textarea/app-textarea.component';
import { AppCheckboxComponent } from './app-checkbox/app-checkbox.component';
import { AppSwitchComponent } from './app-switch/app-switch.component';
import { AppTreedropdownComponent } from './app-treedropdown/app-treedropdown.component';

import { AppSelectboxComponent } from './app-selectbox/app-selectbox.component';

import { AppRadioComponent } from './app-radiobutton/app-radiobutton.component';
import { AppSliderComponent } from './app-slider/app-slider.component';
import { AppDatepickerComponent } from './app-datepicker/app-datepicker.component';
import { AppProgressbarComponent } from "./app-progressbar/app-progress.component";
import { AppTypeaheadComponent } from './app-typeahead/app-typeahead.component';
import { NouisliderModule } from 'ng2-nouislider';
import { NgbTypeaheadConfig } from './ngbcomponents/typeahead/typeahead-config';

//widgets
import { TabsComponent } from "./app-tabs/app-tabs.component";
import { AlertsComponent } from "./app-alerts/app-alerts.component";
import { ModalComponent } from "./app-modal/app-modal.component";
import { ListComponent } from "./app-list/app-list.component";
import { BadgesComponent } from "./app-badges/app-badges.component";
import { PortletTabsComponent } from "./app-portlettabs/app-portlettabs.component";
import { GridNavComponent } from "./app-gridnav/app-gridnav.component";

import {AppSelect2Component} from './app-select2/app-select2.component';
import { MasterWidgetsComponent } from "./master-widgets-page/masterwidgets.component";

import { DropzoneModule } from './dropzone/dropzone.module';
import { DROPZONE_CONFIG } from './dropzone/dropzone.interfaces';
import { DropzoneConfigInterface } from './dropzone/dropzone.interfaces';
import {AppDropZoneComponent} from './app-dropzone/app-dropzone.component';
import {UsersComponent} from './users/users.component';
import { DataTableModule } from '../mastercomponents/ngbcomponents/datatable/datatable';
import { MyFormDirective } from '../globals/myform';
import { AppCustomdropdownComponent } from './app-customdropdown/app-customdropdown.component';
import { AppDatatableComponent } from "../Common/app-datatable/app-datatable.component";
import { AppFilterComponent } from "../Common/app-filter/app-filter.component";
import { NgxMaskModule } from 'ngx-mask-2';

import { AppDaterangepickerComponent } from './app-daterangepicker/app-daterangepicker.component';
import { AppDatepickerrangeComponent } from './app-daterangepicker/app-datepickerrange.component';
import { AppDaterangepickerDirective } from './app-daterangepicker/app-daterangepicker.directive';
import { LocaleConfig, DefaultLocaleConfig } from './app-daterangepicker/app-daterangepicker.config';
import { TreeviewModule } from 'ngx-treeview';
import { MytreeviewPipe } from './app-treedropdown/mytreeview.pipe';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
	// Change this to your upload POST address:
	 url: 'https://httpbin.org/post',
	 maxFilesize: 50,
	 acceptedFiles: 'image/*'
 };

import { NoDblClickDirective } from '../Directives/no-dbl-click.directive';
import { Http } from '@angular/http';
import { ColorPickerModule } from 'ngx-color-picker';
import { AppColorPickerComponent } from './app-color-picker/app-color-picker.component';

@NgModule({

  imports: [
    CommonModule,
	FormsModule,
	NgbModule.forRoot(),
	MasterControlsRoutingModule,
	CustomFormsModule,
	NouisliderModule,
	DropzoneModule,
	DataTableModule,
	NgxMaskModule.forRoot(),
	ColorPickerModule,
	TreeviewModule.forRoot()
  ],
  declarations: [
	HeaderComponent,
	MenuComponent,
	MasterComponent,
	MasterControlPageComponent,
	MasterWidgetsComponent,
	AppButtonComponent,
	AppInputTextComponent,
	AppTextboxComponent,
	AppTextboxmaskedComponent,
	AppSwitchComponent,
	ValidationComponent,
	AppTextareaComponent,
	AppCheckboxComponent,
	AppSelectboxComponent,
	AppRadioComponent,
	AppSliderComponent,
	AppDatepickerComponent,
	AppDropZoneComponent,
	AppProgressbarComponent,
	AppTypeaheadComponent,
	AppSelect2Component,
	MinLengthArrayValidator,
	HexadecimalValueValidator,
	RegExValidator,
	TabsComponent,
    AlertsComponent,
    ModalComponent,
	ListComponent,
	BadgesComponent,
	PortletTabsComponent,
	GridNavComponent,
	UsersComponent,
	MyFormDirective,
	AppCustomdropdownComponent,
	AppDatatableComponent,
	AppFilterComponent,
	NoDblClickDirective,
	AppDaterangepickerComponent,
	AppDatepickerrangeComponent,
	AppDaterangepickerDirective,
	AppColorPickerComponent,
	AppTreedropdownComponent,
	MytreeviewPipe
	],
	exports:[
		//HeaderComponent,
		//MenuComponent,
		MasterComponent,
		MasterControlPageComponent,
		MasterWidgetsComponent,
		AppButtonComponent,
		AppInputTextComponent,
		AppTextboxComponent,
		AppTextboxmaskedComponent,
		AppSwitchComponent,
		ValidationComponent,
		AppTextareaComponent,
		AppCheckboxComponent,
		AppSelectboxComponent,
		AppRadioComponent,
		AppSliderComponent,
		AppDatepickerComponent,
		AppDropZoneComponent,
		AppProgressbarComponent,
		AppTypeaheadComponent,
		AppSelect2Component,
		MinLengthArrayValidator,
		RegExValidator,
		TabsComponent,
		AlertsComponent,
		ModalComponent,
		ListComponent,
		CommonModule,
		FormsModule,
		CustomFormsModule,
		NouisliderModule,
		DropzoneModule,
		ColorPickerModule,
		UsersComponent,
		MyFormDirective,
		AppCustomdropdownComponent,
		AppDatatableComponent,
		AppFilterComponent,
		NoDblClickDirective,
		AppDaterangepickerComponent,
		AppDatepickerrangeComponent,
		AppDaterangepickerDirective,
		AppColorPickerComponent,
		AppTreedropdownComponent,
		MytreeviewPipe
	],
	entryComponents: [
		AppDaterangepickerComponent
	],
	providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
	NgbTypeaheadConfig,
	{
		provide: LocaleConfig, 
		useValue: DefaultLocaleConfig 
	},
	MytreeviewPipe
	]
})
export class MasterControlsModule { 
	constructor(@Optional() @SkipSelf() parentModule: MasterControlsModule) {
    if (parentModule) {
      throw new Error('MasterControlsModule is already loaded. Import it in the root module only');
    }
  }
}

export function localConfigFactory(config?: LocaleConfig) {
    //console.log("Master Control Module LocaleConfig Loaded");
	//console.log(config);
	if (config == null || config == undefined){
		return DefaultLocaleConfig;
	} else {
		return {...DefaultLocaleConfig, ...config};
	}
};