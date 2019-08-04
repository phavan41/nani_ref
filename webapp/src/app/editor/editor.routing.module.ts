import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from "./editor.component";
import { ManageusersComponent}from '../user/manageusers/manageusers.component';
import { ManageApplicationsComponent } from './manage-applications/manage-applications.component';

const authRoutes: Routes = [
    {
        path: '',
        component: EditorComponent,
        
        children: [
            {
                path: '',
                children: [
                    { path: 'users', component: ManageusersComponent },
                    { path: 'Manage Application', component: ManageApplicationsComponent },
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
export class EditorRoutingModule {

}
