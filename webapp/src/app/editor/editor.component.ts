import { Component } from '@angular/core';
import { Globals } from '../globals/global';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '../helpers';


declare let toastr;

@Component({
    selector: 'app-root',
    templateUrl: './editor.component.html'
})
export class EditorComponent {
  globalBodyClass = 'm-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default';
    
  constructor(public globals: Globals, private _router: Router) {
    globals.account = '';
  }

  ngOnInit() {
    //console.log('Editor Component On Init');
		this._router.events.subscribe((route) => {
			if (route instanceof NavigationStart) {
				console.log('Editor Component Route Start');
				Helpers.setLoading(true);
				Helpers.bodyClass(this.globalBodyClass);
			}
			if (route instanceof NavigationEnd) {
				console.log('Editor Component Route End');
				Helpers.setLoading(false);
			}
		});
	}
}
