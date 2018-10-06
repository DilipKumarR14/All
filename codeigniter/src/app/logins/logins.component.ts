import { Component } from '@angular/core';
import {FormControl,Validators } from '@angular/forms';
@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
})
export class LoginsComponent {
public title="Login In";
user = new FormControl('',[Validators.required,Validators.pattern("[A-Za-z]*")]);
passwd= new FormControl('',[Validators.required]);
  constructor() { }
  getNameErrorMessage(){
  
    return this.user.hasError('required') ? 'Name is required':
    this.user.hasError('pattern') ? 'Name Must Be Characters ':
    '';
  }
  getPasswordErrorMessage(){
    return this.passwd.hasError('required') ? 'password is required':
    '';
  }
  save(){
    debugger;
  }
}
