import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DatabaseService } from "../app/service/database.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private _authService:DatabaseService, private _router:Router){

  }
  // is a interface of CanActivate
  // return true/false value
   canActivate():boolean{
    //calling the function to check whether token is present or not 
    if (this._authService.loggedIn()) {
      
      return true
    }else{
      // else navigate back to login page
      this._router.navigate(['/logins'])
      return false
    }
   }

}
