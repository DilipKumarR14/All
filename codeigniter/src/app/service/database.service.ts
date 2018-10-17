import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private http: HttpClient, private route:ActivatedRoute) { }
  mode: any = {};
  mode1:any ={};
  mode2:any = {};
  mode3:any = {};
  mode4:any = {};
  obs:any={};
  public urls = "http://localhost/codeigniter/regform";
  public loginurl="http://localhost/codeigniter/login";
  private forgeturl="http://localhost/codeigniter/forgot";
  private resetloginurl="http://localhost/codeigniter/reset";
  private validloginurl="http://localhost/codeigniter/mailvali";
  private getmail="http://localhost/codeigniter/getEmailId1";

  Register(mode) {
    debugger;
    const params = new FormData();
    params.append("name", mode.name);
    params.append("email", mode.email);
    params.append("mobile", mode.mobile);
    params.append("password", mode.passwd);

    console.log(params)
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    debugger;
    return this.http.post(this.urls, params, otheroption).pipe(
      map((res: Response) => res)
    );
   
  } 

  Login(mode1) {
    debugger;
    const params = new FormData();
    params.append("email", mode1.email);
    params.append("password", mode1.passwd);

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    debugger;
    return this.http.post(this.loginurl, params, otheroption).pipe(
      map((res: Response) => res)
    )
  }

  Forget(mode2) {
    debugger;
    const params = new FormData();
    params.append("email", mode2.email);

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // this.obs =  
    // debugger;
    return this.http.post(this.forgeturl, params, otheroption).pipe(
      map((res: Response) => res)
    )
  }

  Reset(mode3) {
    debugger;
    const params = new FormData();
    params.append("email", mode3.email);
    params.append("pass",mode3.pass);
    params.append("pass1",mode3.pass1);
    // To fetch the particular query parameter values
    params.append("token",this.route.snapshot.queryParamMap.get('token'));
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.resetloginurl, params, otheroption).pipe(
      map((res: Response) => res)
    )
  }


  Valid(mode4) {
    debugger;
    const params = new FormData();
    params.append("email", mode4.email);
    // To fetch the particular query parameter values
    params.append("token",this.route.snapshot.queryParamMap.get('token'));
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.validloginurl, params, otheroption).pipe(
      map((res: Response) => res)
    )
  }
  
  gett(){
    debugger;
    let getid = new FormData();
    getid.append("token",this.route.snapshot.queryParamMap.get('token'));
    let otheroption: any = {
    'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.getmail, getid, otheroption)
    }

}
