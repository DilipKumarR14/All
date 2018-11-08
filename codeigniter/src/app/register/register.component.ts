import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DatabaseService]
})
export class RegisterComponent {
  // public greeting="";
  constructor(private service: DatabaseService, private routes: Router,private spinner:NgxSpinnerService) {

  }
  public title = "Welcome";
  /**
   * @var email holds the email present in form data 
   * @var user holds the name present in form data 
   * @var mobile holds the mobile present in form data 
   * @var passwd holds the password present in form data 
   */
  email = new FormControl('', [Validators.required, Validators.email]);
  user = new FormControl('', [Validators.required, Validators.pattern("[A-Za-z]*")]);
  user1 = this.user.value;
  mobile = new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]);
  passwd = new FormControl('', [Validators.required]);
  aemail = new FormControl('', [Validators.required, Validators.email]);

  model: any = {};// fetching the value from form
  
  public altr: boolean;
  responseMessage = "";
  // getErrorMessage() {
  //   return this.email.hasError('required') ? 'Email is required' :
  //       this.email.hasError('email') ? 'Not a valid email' :
  //           '';
  // }
  getErrorMessage() {
    if (this.altr == true) {
      return "Invalid Email";
    }
    else if (this.aemail.hasError("required")) {
      this.model.aemail = null
      return "You must enter a Email";
    }
    else {
      this.model.aemail = null
      return "Not A Valid Email";
    }
  }

  getNameErrorMessage() {
    if (this.altr == true) {
      return "Invalid Name Format";
    }
    else if (this.aemail.hasError("required")) {
      this.model.aemail = null
      return "You must enter a Name";
    }
    else {
      this.model.aemail = null
      return "Must be characters Fool";
    }
  }

  getMobileErrorMessage() {
    if (this.altr == true) {
      return "Invalid Mobile Number";
    }
    else if (this.aemail.hasError("required")) {
      this.model.aemail = null
      return "You must enter a Mobile Number";
    }
    else {
      this.model.aemail = null
      return "Must be 10 Digit and Number";
    }
  }
  getPasswordErrorMessage() {
    if (this.altr == true) {
      return "Invalid password";
    }
    else if (this.aemail.hasError("required")) {
      this.model.aemail = null
      return "You must enter a password";
    }
    else {
      this.model.aemail = null
      return "Minimum 4 characters required";
    }
  }



  // getNameErrorMessage(){

  //   return this.user.hasError('required') ? 'Name is required':
  //   this.user.hasError('pattern') ? 'Name Must Be Characters ':
  //   '';
  // }
  // getMobileErrorMessage(){
  //   return this.mobile.hasError('required') ? 'Mobile number is required':
  //   this.mobile.hasError('pattern') ? 'Must be number and 10 digit':
  //   '';
  // }
  // getPasswordErrorMessage(){
  //   return this.passwd.hasError('required') ? 'Password is required':
  //   '';
  // }

  save() {
    
    this.spinner.show();
    var fetch = this.model;
    this.service.Register(fetch).subscribe(
      // data returned will be stored in status variable
      (status: any) => {
        
        if (status.status == "1") {
          
          console.log("got respo", status);
          alert("SuccessFully Saved")
          alert("Check Your Mail")
          this.spinner.hide();

          // move to the other page after success
          this.routes.navigate(['/logins'])
        }
        else if (status.status == "null") {
          
          alert("Enter All Mandatory Field")
          this.spinner.hide();

        }
        else if (status.status == "2") {
          
          alert("EMail Not sent/Check Your EmailId")
          this.spinner.hide();

        }
        else {
          alert("Email/Mobile is already present")
          this.spinner.hide();

        }

      }
    );
  }
}
