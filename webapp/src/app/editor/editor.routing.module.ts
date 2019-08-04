import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from "./editor.component";
import { ManageusersComponent}from '../user/manageusers/manageusers.component';
import { ManageApplicationsComponent } from './manage-applications/manage-applications.component';
import { ManageDocumentsComponent } from './manage-documents/manage-documents.component';

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
                    { path :  'Documents',component : ManageDocumentsComponent}
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
