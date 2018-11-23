import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'angular2-cookie';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(private http: HttpClient, private cookie: CookieService) { }
  private collabemail = "http://localhost/codeigniter/collabemail";
  private owner = "http://localhost/codeigniter/collabowner";
  private collabedemail = "http://localhost/codeigniter/collabemailed";
  private deletecollab = "http://localhost/codeigniter/deletecollab";


  /**
   * 
   * @param email to store the email
   * @param id to store the id of the card
   * @param owner to store the owner of the card
   * @return Observables
   */
  getEmail(email, id, owner) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("email", email);
    params.append("id", id);
    params.append("owner", owner);
    return this.http.post(this.collabemail, params, otheroption)

  }

  /**
   * to get owner of the particular card 
   * @param id id of the card
   * @return Observables
   */
  getOwner(id) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("id", id);
    return this.http.post(this.owner, params, otheroption);

  }

  private getmail = "http://localhost/codeigniter/collaaddemail";
  /**
   * to check for the owner of the card
   * @param email to stoe the email
   * @param id to store the id of the card
   * @return Observables
   */
  checkmail(email, id) {


    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("email", email);
    params.append("id", id);
    params.append("owner", this.cookie.get("email"));
    return this.http.post(this.getmail, params, otheroption);
  }


  /**
   * to get all collabed email
   * @param id id of the card
   * @return Observables
   */
  getCollabedEmail(id) {


    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("id", id);
    return this.http.post(this.collabedemail, params, otheroption);


  }
  /**
   * to delete the card with specific id 
   * @param id id of the card
   * @param email email of the card
   * @return Observables
   */
  deleteCollabEmail(id, email) {


    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("email", email);
    params.append("id", id);
    params.append("owner", this.cookie.get("email"));
    return this.http.post(this.deletecollab, params, otheroption);
  }

  private collabemailnotecard = "http://localhost/codeigniter/displaycollab";
  /**
   * for to display in the main card collabed emails
   * @param test to get the all information from note to collab component
   * @return Observables
   */
  getDisplayCollab(test) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("all", test);
    return this.http.post(this.collabemailnotecard, params, otheroption);
  }

  private emailids = "http://localhost/codeigniter/getmail"

  /**
   * 
   * @param email to fetch all the emails for the card
   * @return Observables
   */
  getAllEmailId(email) {


    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("email", email);
    params.append("owner", this.cookie.get("email"));
    return this.http.post(this.emailids, params, otheroption);
  }

}
