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
  save()
{
  var fetch=this.model;
  debugger;
  this.service.Forget(fetch).subscribe(
    // data returned will be stored in status variable
    (status:any) => {
      debugger;
      if(status.status == "1" ){

        console.log("got respo",status);
    // this.responseMessage="Successfully Saved";
    alert("Email Available")
    // move to the other page after success
    this.routes.navigate(['/resets'])
      }
      else if(status.status == "null"){
        alert("Enter All Mandatory Field")
      }
      else{
        alert("Email-Id is Not Present")
      }
  }
  );
}
  ngOnInit() {
  }

}
