import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http: HttpClient, private cookie: CookieService) { }
  private url = "http://localhost/codeigniter/addLabel";
  private fetch = "http://localhost/codeigniter/fetchLabel";
  private deletelabel = "http://localhost/codeigniter/deleteLabel";
  private editLabelurl = "http://localhost/codeigniter/editLabelurl";
  private addlabel = "http://localhost/codeigniter/addlabel";
  mode: any;

  /**
   * to store the label into db
   * @param mode that contain the label information 
   */
  label(mode) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("label", mode.label);
    const email = this.cookie.get("email");
    params.append("email", email)
    return this.http.post(this.url, params, otheroption);

  }

  /**
   * to fetch the label from the database
   */
  fetchlabel() {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    const email = this.cookie.get("email");
    params.append("email", email)
    return this.http.post(this.fetch, params, otheroption);
  }

  /**
   * for delete the label from the database
   * @param id id of the label
   */
  delete(id) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("id", id);
    return this.http.post(this.deletelabel, params, otheroption);
  }

  /**
   * to change the label
   * @param id to store the id of the label
   * @param data to store the label
   */
  editLabel(id, data) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("id", id);
    params.append("label", data);
    return this.http.post(this.editLabelurl, params, otheroption);
  }

  /**
   * to add the label of particular id
   * @param email store the email
   */
  addLabel(email) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("email", email)
    return this.http.post(this.addlabel, params, otheroption);
  }

  private labelcard = "http://localhost/codeigniter/addLabelCard";

  /**
   * to add the label to the card
   * @param id to store the id of label
   * @param labelname label name
   */
  addLabelCard(id, labelname) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const params = new FormData();
    params.append("id", id);
    params.append("labelname", labelname);
    return this.http.post(this.labelcard, params, otheroption);
  }

  private labeldelete = "http://localhost/codeigniter/deleteLabelCard";

  /**
   * to delete the label of particular id
   * @param id of the label
   */
  deleteLabelCard(id) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const params = new FormData();
    params.append("id", id);
    return this.http.post(this.labeldelete, params, otheroption);
  }

  private eachlabel = "http://localhost/codeigniter/getLabel";

  /**
   * 
   * @param label to store the label 
   */
  getLabelForCard(label) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const params = new FormData();
    params.append("label", label);
    return this.http.post(this.eachlabel, params, otheroption);
  }


}
