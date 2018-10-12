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

	public title="Forget Password";
email = new FormControl('',[Validators.required,Validators.email]);
model : any = {};// fetching the value from form
responseMessage="";
	constructor(private service:DatabaseService,private routes:Router) { }
	getErrorMessage(){  
		return this.email.hasError('required') ? 'Email is required':
		'';
	}
	save()
{
  debugger;
	var fetch = this.model;         
    this.service.Forget(fetch).subscribe(
      (status: any) => {
        debugger;
        if (status.status == "1") {
          debugger;
          console.log("got respo", status);
          alert("Check Your EMail")
          this.routes.navigate(['/resets'])
        }
        else if (status.status == "0") {         

          alert("Problem In Sending Error/Check Email")
        }
        else if (status.status == "2"){   
          alert("Check Email Entered")
        }
      });
}
	ngOnInit() {
	}

}
