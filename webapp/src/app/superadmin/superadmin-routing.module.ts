import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuperAdminComponent } from './superadmin.component';
import { AccountsComponent } from './accounts/accounts.component';
//import { UsersComponent } from './users/users.component';
import { LanguagesComponent } from './languages/languages.component';
import { MasterusersComponent } from './users/masterusers.component';
import { TrackersComponent } from "./trackers/trackers.component";
import { SettingsComponent } from "./settings/settings.component";
import { TechnicalSettingsComponent } from "./technical-settings/technical-settings.component";
import { ManagemenusComponent } from "./managemenus/managemenus.component";
import { ProcessscriptsComponent } from './processscripts/processscripts.component';
import { ActivitylogComponent } from './activitylog/activitylog.component';
import { OTAScheduleComponent } from './ota-schedule/ota-schedule.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { profileActionComponet } from '../user/profileaction/profileaction.component'

const superAdminauthRoutes: Routes = [
    {path:'',component:SuperAdminComponent,
    children:[
    {path: '',
    children: [
        { path: 'accounts', component: AccountsComponent },
		{ path: 'users', component: MasterusersComponent,data : {data : 'superadmin'} },
        { path: 'trackers', component: TrackersComponent },
        { path: 'technicalsettings', component: TechnicalSettingsComponent },
        { path: 'languages', component: LanguagesComponent },
        { path: 'settings', component: SettingsComponent ,children:[
            { path: 'languages', component: LanguagesComponent },
            { path: 'technicalsettings', component: TechnicalSettingsComponent },
        ]},
        { path: 'managemenus', component: ManagemenusComponent },
        {path :'process', component :ProcessscriptsComponent},
        {path :'activity', component :ActivitylogComponent},
        {path:'ota-schedule', component : OTAScheduleComponent},
        { path: 'vehicles', component: VehicleComponent },
        {path: 'profileaction',component :profileActionComponet}
        
    ]
}
]
}
]

@NgModule({
    imports: [
        RouterModule.forChild(superAdminauthRoutes),
        NgbModule.forRoot()
    ],
    exports: [RouterModule]
})
export class SuperAdminRoutingModule {

}