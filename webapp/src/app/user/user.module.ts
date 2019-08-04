import { DashboardComponent } from './Dashboard/dashboard.component';
import { MasterComponent } from './Master/master.component';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserRoutingModule } from './user.routing.module';
import { CommonModule} from '@angular/common';
import { HeaderComponent } from './layout/nav.header.component';
import { MenuComponent } from './layout/nav.menu.component';
import { SharedModule } from '../mastercomponents/ngbcomponents/common/shared';
import { DataTableModule } from '../mastercomponents/ngbcomponents/datatable/datatable';
import { NgbTypeaheadConfig } from '../mastercomponents/ngbcomponents/typeahead/typeahead-config';
import { profileActionComponet } from './profileaction/profileaction.component';
import { MasterControlsModule } from '../mastercomponents/master-controls.module';
import { SettingsComponent } from "./settings/settings.component";
import { UserprofileComponent } from "./userprofile/userprofile.component";
import { ManageusersComponent } from "./manageusers/manageusers.component";
import { Helper } from './helper';
import { NotificationComponent } from "./notification/notification.component";
import { NguiMapModule} from '@ngui/map';
import { TagInputModule } from 'ngx-chips';
import { ManageAlertsComponent } from './manage-alerts/manage-alerts.component';
import { CustompipePipe } from './notification/custompipe.pipe';
import { RawdataeventsComponent } from './rawdataevents/rawdataevents.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { NgxMaskModule } from 'ngx-mask-2';
import { InputMaskModule } from 'primeng/primeng';
import { HighchartsChartModule } from 'highcharts-angular';
import { ColorPickerModule } from 'ngx-color-picker';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({

    declarations: [
        MasterComponent,
        DashboardComponent,
        UserComponent,
        HeaderComponent,
        MenuComponent,
        profileActionComponet,
        SettingsComponent,
        UserprofileComponent,
        ManageusersComponent,
      NotificationComponent,
      ManageAlertsComponent,
      CustompipePipe,
      RawdataeventsComponent,
      ExpensesComponent
    ],
    imports: [
        FormsModule,
        UserRoutingModule,
        NgbModule.forRoot(),
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
    providers: [NgbTypeaheadConfig, Helper]
})
export class UserModule {
	
}
