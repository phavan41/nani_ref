import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from '../../globals/global';
import { AppHelper } from '../../apphelper';
import { environment } from '../../../environments/environment';

declare let mLayout: any;
@Component({
    selector: 'nav-menu',
    templateUrl: './nav.menu.html',
    //styleUrls: ['./signin.component.css']
})
export class MenuComponent implements OnInit {
	environment = environment;
	
    constructor(private apphelper:AppHelper,public globals: Globals) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
		if (mLayout){
			mLayout.initAside();
		}
		
        let menu = (<any>$('#m_ver_menu')).mMenu(); let item = $(menu).find('a[href="' + window.location.pathname + '"]').parent('.m-menu__item'); (<any>$(menu).data('menu')).setActiveItem(item);
    }
}
