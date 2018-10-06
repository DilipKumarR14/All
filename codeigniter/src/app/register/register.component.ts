import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[DatabaseService]
})
export class RegisterComponent{
  // public greeting="";
  constructor(private service:DatabaseService){

  }
public title="Welcome";
email = new FormControl('', [Validators.required,Validators.email]);
user = new FormControl('',[Validators.required,Validators.pattern("[A-Za-z]*")]);
//a=this.user.value;
user1 = this.user.value;
mobile = new FormControl('',[Validators.required,Validators.pattern("[0-9]{10}")]);
passwd= new FormControl('',[Validators.required]);
model : any={};// fetching the value from form

getErrorMessage() {
  return this.email.hasError('required') ? 'Email is required' :
      this.email.hasError('email') ? 'Not a valid email' :
          '';
}
getNameErrorMessage(){
  
  return this.user.hasError('required') ? 'Name is required':
  this.user.hasError('pattern') ? 'Name Must Be Characters ':
  '';
}
getMobileErrorMessage(){
  return this.mobile.hasError('required') ? 'Mobile number is required':
  this.mobile.hasError('pattern') ? 'Must be number and 10 digit':
  '';
}
getPasswordErrorMessage(){
  return this.passwd.hasError('required') ? 'Password is required':
  '';
}

save()
{
  var fetch=this.model;
  
  var name=fetch.name;
  var email=fetch.email;
  var mobile=fetch.mobile;
  var password=fetch.passwd;

  // this.service.Register()
  // this.greeting="Clicked "; 
  debugger;
  this.service.Register(fetch).subscriber((Statusdata:any)=>{
    if(Statusdata.status == 1){
      alert("success");
    }
  })
}
}
