import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'angular2-cookie';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(private http:HttpClient,private cookie:CookieService) { }
  private collabemail = "http://localhost/codeigniter/collabemail";
  private owner =  "http://localhost/codeigniter/collabowner";
  private collabedemail = "http://localhost/codeigniter/collabemailed";
  private deletecollab = "http://localhost/codeigniter/deletecollab";
  getEmail(email,id,owner){
 
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("email",email);
    params.append("id",id);
    params.append("owner",owner);
    return this.http.post(this.collabemail, params, otheroption)

  }


  getOwner(id){
     
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("id",id);
    return this.http.post(this.owner,params, otheroption);

  }

  private getmail = "http://localhost/codeigniter/collaaddemail";

  checkmail(email,id){
    
     
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("email",email);
    params.append("id",id);
    params.append("owner",this.cookie.get("email"));
    return this.http.post(this.getmail,params, otheroption);
  }

  // to get all collabed email
  getCollabedEmail(id){

     
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("id",id);
    return this.http.post(this.collabedemail,params, otheroption);
  

  }
  deleteCollabEmail(id,email){
        
     
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("email",email);
    params.append("id",id);
    params.append("owner",this.cookie.get("email"));
    return this.http.post(this.deletecollab,params, otheroption);
  }

  // for to display in the main card collabed emails
private collabemailnotecard = "http://localhost/codeigniter/displaycollab";
  getDisplayCollab(test){
     
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("all",test);
    return this.http.post(this.collabemailnotecard,params,otheroption);
  }

  private emailids = "http://localhost/codeigniter/getmail"
  
  getAllEmailId(email){
    
     
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("email",email);
    params.append("owner",this.cookie.get("email"));
    return this.http.post(this.emailids,params,otheroption);
  }

}
