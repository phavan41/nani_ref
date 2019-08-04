import { Component, OnInit } from '@angular/core';
import { AppHelper } from '../../apphelper';

@Component({
  selector: 'app-masterusers',
  templateUrl: './masterusers.component.html',
  styleUrls: ['./masterusers.component.css']
})
export class MasterusersComponent implements OnInit {

  constructor(private apphelper:AppHelper) { }

  ngOnInit() {
  }

}
