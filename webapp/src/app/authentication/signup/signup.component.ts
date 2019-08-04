import { CommonService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from '../signin/signin.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  login:any={}
    constructor(private authService: CommonService) { }

  ngOnInit() {
  }
onSignUp(form:NgForm){
  //const email= form.value.email;
  //const password= form.value.password;
  //this.CommonService.signUpUser(email, password);
}
  
}
