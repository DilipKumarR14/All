import { Component, OnInit,Input } from '@angular/core';
import {FormControl,Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
import { timeInterval } from 'rxjs/operators';
// import { NgProgress } from 'ngx-progressbar';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
	selector: 'app-forget',
	templateUrl: './forget.component.html',
	styleUrls: ['./forget.component.css']   
})
export class ForgetComponent implements OnInit {

  public title="Forget Password";
  color = 'primary';
  mode = 'determinate';
  bufferValue = 75;
  public value = 0;

email = new FormControl('',[Validators.required,Validators.email]);
model : any = {};// fetching the value from form
responseMessage="";

	constructor(private service:DatabaseService,private routes:Router,private spinner:NgxSpinnerService) { }
	getErrorMessage(){  
		return this.email.hasError('required') ? 'Email is required':
		'';
  }

  save()
{  this.spinner.show();
  // this.ngProgress.start();
  debugger;
	var fetch = this.model;         
    this.service.Forget(fetch).subscribe(
      (status: any) => {
        debugger;
        if (status.status == "200") {
          debugger;
          // this.value = 90;
          console.log("got respo", status);
          alert("Check Your EMail")
          this.spinner.hide();
          this.routes.navigate(['/logins']);
        }
        else if (status.status == "400") {         

          alert("Problem In Sending Error/Check Email")
          this.spinner.hide();
        }
        else if (status.status == "204"){   
          alert("Email Field Is NOt FOund")
          this.spinner.hide();
        }
      });
}

	ngOnInit() {
    this.spinner.hide();
    // setTimeout(()=>{
    //   this.spinner.show();
    // },5000);
	}

}
