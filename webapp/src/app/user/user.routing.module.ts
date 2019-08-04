import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { MasterComponent } from './Master/master.component';
import { UserComponent } from './user.component';
import { profileActionComponet } from "./profileaction/profileaction.component";
import { SettingsComponent } from "./settings/settings.component";
import { UserprofileComponent } from "./userprofile/userprofile.component";
import { ManageusersComponent } from "./manageusers/manageusers.component";
import { NotificationComponent } from "./notification/notification.component";
import { ManageAlertsComponent } from './manage-alerts/manage-alerts.component';
import { RawdataeventsComponent } from "./rawdataevents/rawdataevents.component";

const authRoutes: Routes = [
    {
        path: ':id',component: UserComponent,
        children: [
            {
                path: '',
                children: [
                    { path: 'master', component: MasterComponent },
                    { path: '',redirectTo:'dashboard'},
                    { path: 'profileaction', component: profileActionComponet },
                    { path: 'settings', component: SettingsComponent },
                    { path: 'userprofile', component: UserprofileComponent },
                    /* { path: 'locations', component: LocationsComponent }, */
                    { path: 'manageusers', component: ManageusersComponent,data : {data : 'admin'} },
                    { path: 'dashboard', component: DashboardComponent },
                    { path: 'notification', component: NotificationComponent },
                    { path:'alerts', component:ManageAlertsComponent},
                    { path:'reports/rawdata', component:RawdataeventsComponent},
                    
				]
            }
        ]
    }  
]
@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule {

}
