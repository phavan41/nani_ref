
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LogginCheckGuard} from './logincheck';

const appRoutes: Routes = [
    { path: '', loadChildren: './authentication/auth.module#AuthModule' },
    { path:'editor', loadChildren:'./editor/editor.module#EditorModule', 
    canActivate:[LogginCheckGuard] },
    { path:'superadmin', loadChildren:'./superadmin/superadmin.module#SuperAdminModule', 
		canActivate:[LogginCheckGuard] },
    { path:'account', loadChildren: './user/user.module#UserModule', 
		canActivate:[LogginCheckGuard]},
    { path: 'master', loadChildren:'./mastercomponents/master-controls.module#MasterControlsModule' },
    { path: 'common', loadChildren:'./Common/common.module#CommonnModule', 
		canActivate:[LogginCheckGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
