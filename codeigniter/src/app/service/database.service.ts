import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  mode: any = {};
  mode1: any = {};
  mode2: any = {};
  mode3: any = {};
  mode4: any = {};
  mode5: any = {};
  obs: any = {};
  public urls = "http://localhost/codeigniter/regform";
  public loginurl = "http://localhost/codeigniter/login";
  private forgeturl = "http://localhost/codeigniter/forgot";
  private resetloginurl = "http://localhost/codeigniter/reset";
  private validloginurl = "http://localhost/codeigniter/mailvali";
  private getmail = "http://localhost/codeigniter/getEmailId1";
  private getcolor = "http://localhost/codeigniter/color";
  private storenote = "http://localhost/codeigniter/note";

  /**
   * store the user data into the db after register
   * @param mode to get all information in model
   */
  Register(mode) {
    //

    const params = new FormData();
    params.append("name", mode.name);
    params.append("email", mode.email);
    params.append("mobile", mode.mobile);
    params.append("password", mode.passwd);

    console.log(params)
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(this.urls, params, otheroption).pipe(

    );

  }

  /**
   * for login check the whether the user is valid or not
   */
  public getToken(): string {
    return localStorage.getItem("token");
  }

  /**
   * for the login of the fundoo note
   * @param mode1 conatins the email and password entred by the user
   */
  Login(mode1) {

    const params = new FormData();
    params.append("email", mode1.email);
    params.append("password", mode1.passwd);
    // const res = localStorage.getItem("token");


    return this.http.post(this.loginurl, params).pipe(

    )
  }
  /**
   * forget password link to user to change the password
   * @param mode2 contains email,password,confirm password
   */
  Forget(mode2) {

    const params = new FormData();
    params.append("email", mode2.email);
    params.append("pass", mode2.passwd);
    params.append("pass1", mode2.passwd);
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(this.forgeturl, params, otheroption).pipe(

    )
  }

  /**
   * to reset the apssword of particular emailid
   * @param mode3 contains email,password,confirm password
   */
  Reset(mode3) {

    const params = new FormData();
    // params.append("email", mode3.email);
    params.append("pass", mode3.pass);
    params.append("pass1", mode3.pass1);
    // To fetch the particular query parameter values
    params.append("token", this.route.snapshot.queryParamMap.get('token'));
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.resetloginurl, params, otheroption).pipe(

    )
  }

  /**
 * to validate the email and token 
 * @param mode4 contains token for the validation
 */
  Valid(mode4) {
    const params = new FormData();
    params.append("email", mode4.email);
    // To fetch the particular query parameter values
    params.append("token", this.route.snapshot.queryParamMap.get('token'));
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.validloginurl, params, otheroption).pipe(

    )
  }

  mode6: any = {};
  public urlverify = "http://localhost/codeigniter/verify";
  /**
   * // to check whether the localstorage is set with token when logged in user is valid or not
   */
  loggedIn() {
    return !!localStorage.getItem("token");
  }

  // title and note entered by user is is added to table
  /**
   * to save the title and note information into the db
   * @param mode5 contains the information about title and note
   */
  store(mode5) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("title", mode5.title);
    params.append("note", mode5.note);

    console.log(params);


    return this.http.post(this.storenote, params, otheroption).pipe(

    )
  }

  /**
   * retirve the mail in forget password link send to mail
   */
  getMail() {

    let getid = new FormData();
    getid.append("token", this.route.snapshot.queryParamMap.get('token'));
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.getmail, getid, otheroption)
  }



}
