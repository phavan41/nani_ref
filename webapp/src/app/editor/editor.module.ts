
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EditorComponent } from './editor.component';
import {EditorRoutingModule} from './editor.routing.module';
import { CommonModule} from '@angular/common';
import {HeaderComponent} from './layout/nav.header.component';
import {MenuComponent} from './layout/nav.menu.component';
import { SharedModule } from '../mastercomponents/ngbcomponents/common/shared';
import { DataTableModule } from '../mastercomponents/ngbcomponents/datatable/datatable';
import { NgbTypeaheadConfig } from '../mastercomponents/ngbcomponents/typeahead/typeahead-config';
import { MasterControlsModule } from '../mastercomponents/master-controls.module';
import { NguiMapModule} from '@ngui/map';
import { TagInputModule } from 'ngx-chips';
import { NgxMaskModule } from 'ngx-mask-2';
import { InputMaskModule } from 'primeng/primeng';
import { HighchartsChartModule } from 'highcharts-angular';
import { ColorPickerModule } from 'ngx-color-picker';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UsersComponent } from '../mastercomponents/users/users.component';
import { ManageusersComponent}from '../user/manageusers/manageusers.component';
import { ManageApplicationsComponent } from './manage-applications/manage-applications.component';
import { ManageDocumentsComponent } from './manage-documents/manage-documents.component';

@NgModule({

    declarations: [
        EditorComponent,
        HeaderComponent,
        MenuComponent,
        ManageusersComponent,
        ManageApplicationsComponent,
        ManageDocumentsComponent
    ],
    imports: [
        
        FormsModule,
        CommonModule,
        NgbModule.forRoot(),
        EditorRoutingModule,
        CommonModule,
        MasterControlsModule,
        DataTableModule,
        SharedModule,
        TagInputModule,
        HighchartsChartModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?libraries=visualization,places,drawing&key=AIzaSyBdUmQev-C9BJCwDzgvL8wn00tNeKxKwVQ'}),
        NgxMaskModule.forRoot(),
        ColorPickerModule,
        InfiniteScrollModule
		//InputMaskModule
    ],
    exports:[
    ],
    providers: [NgbTypeaheadConfig]
})
export class EditorModule {
	
}
