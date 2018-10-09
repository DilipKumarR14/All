import { Component } from '@angular/core';
import {FormControl,Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
})
export class LoginsComponent {
  constructor(private service:DatabaseService,private routes:Router) { }

public title="Login In";
email = new FormControl('',[Validators.required,Validators.email]);
passwd= new FormControl('',[Validators.required]);
model : any = {};// fetching the value from form
responseMessage="";

  getEmailErrorMessage(){

    return this.email.hasError('required') ? 'Email is required':
    '';
  }
  getPasswordErrorMessage(){
    return this.passwd.hasError('required') ? 'password is required':
    '';
  }
  saves(){
    
    var fetch=this.model;               // define the function and parameter (ts)
    this.service.Login(fetch).subscribe(
      status => {
      console.log("got respo",status);
      debugger;
      // this.responseMessage="Successfully Saved";
      alert("Registered User")
    }, error => {
      debugger;
      console.log(error)
      // this.responseMessage="Error MailId/Mobile Is Already Present";
      alert("User Is Not Registered")
    })
  }
}
