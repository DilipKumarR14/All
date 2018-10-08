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
public title="Login In";
email = new FormControl('',[Validators.required,Validators.email]);
passwd= new FormControl('',[Validators.required]);
model : any = {};// fetching the value from form
responseMessage="";

  constructor(private service:DatabaseService,private routes:Router) { }
  getEmailErrorMessage(){
  
    return this.email.hasError('required') ? 'Email is required':
    '';
  }
  getPasswordErrorMessage(){
    return this.passwd.hasError('required') ? 'password is required':
    '';
  }
  save(){
    debugger;
    debugger;
    var fetch=this.model;
    this.service.Register(fetch).subscribe((status:any)=>{
      console.log("got respo",status);
      // this.responseMessage="Successfully Saved";
      alert("Registered User")
      // move to the other page after success
      // this.routes.navigate(['/logins'])
    },(error)=>{
      console.log(error)
      // this.responseMessage="Error MailId/Mobile Is Already Present";
      alert("User Is Not Registered")
    })
  }
}
