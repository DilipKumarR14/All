import { Component, OnInit } from '@angular/core';
import {FormControl,Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  public title="Forget Password Form";
email = new FormControl('',[Validators.required,Validators.email]);
passwd= new FormControl('',[Validators.required]);
passwd1= new FormControl('',[Validators.required]);
model : any = {};// fetching the value from form
responseMessage="";
  constructor(private service:DatabaseService,private routes:Router) { }
  getErrorMessage(){  
    return this.email.hasError('required') ? 'Email is required':
    '';
  }
  getPasswordErrorMessage(){
    return this.passwd.hasError('required') ? 'password is required':
    '';
  }
  getPassword1ErrorMessage(){
    return this.passwd1.hasError('required') ? 'password is required':
    '';
  }
  save(){
    debugger;
    debugger;
    var fetch=this.model;
    this.service.Register(fetch).subscribe((status:any)=>{
      console.log("got respo",status);
      // this.responseMessage="Successfully Saved";
      alert("SuccessFully Saved")
      // move to the other page after success
      this.routes.navigate(['/logins'])
    },(error)=>{
      console.log(error)
      // this.responseMessage="Error MailId/Mobile Is Already Present";
      alert("Error MailId/Mobile Is Already Present")
    })
  }
  ngOnInit() {
  }

}
