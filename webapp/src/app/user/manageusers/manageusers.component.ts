import { Component, OnInit } from '@angular/core';
import { AppHelper } from '../../apphelper';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent implements OnInit {
	
  page:any;
  
  constructor(private apphelper:AppHelper) { }

  ngOnInit() {
	 
  }

}
