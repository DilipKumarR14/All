import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resets',
  templateUrl: './resets.component.html',
  styleUrls: ['./resets.component.css']
})
export class ResetsComponent implements OnInit {
  public title = "Reset Password";
  mail = new FormControl('',[Validators.email]);
  pass = new FormControl('', [Validators.required]);
  pass1 = new FormControl('', [Validators.required]);
  model: any = {};// fetching the value from form
  responseMessage = "";
  constructor(private service: DatabaseService, private routes: Router) { }
  getPassErrorMessage() {
    return this.pass.hasError('required') ? 'Password is required' :
      '';
  }
  getConfErrorMessage() {
    return this.pass1.hasError('required') ? 'Confirm Password is required' :
      '';
  }
  getEmailErrorMessage(){
    return this.mail.hasError('required') ? 'Email is required':
		'';
  }
  save() {
    var fetch = this.model;
    debugger;
    this.service.Reset(fetch).subscribe(
      // data returned will be stored in status variable
      (status: any) => {
        debugger;
        if (status.status == "1") {

          console.log("got respo", status);
          // this.responseMessage="Successfully Saved";
          alert("Password Reset Success")
          // move to the other page after success
          this.routes.navigate(['/logins'])
        }
        else if (status.status == "null") {
          alert("Enter All Mandatory Field")
        }
        else {
          alert("Email-Id is Not Present")
        }
      }
    );
  }
  ngOnInit() {
  }

}
