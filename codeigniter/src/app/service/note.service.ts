import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'angular2-cookie';
import { Observable } from 'rxjs';
import { DatabaseService } from './database.service';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  res = "";
  email = "";
  constructor(private http: HttpClient, private cookie: CookieService, private dbs: DatabaseService) { }
  mode: any = {};

  private storenote = "http://localhost/codeigniter/note";
  private fetch = "http://localhost/codeigniter/fetch";
  private colorurl = "http://localhost/codeigniter/color";
  private resultcard = "http://localhost/codeigniter/resultcard";
  private deletereminder = "http://localhost/codeigniter/deletecard";
  private popedit = "http://localhost/codeigniter/popedit";
  private popdelete = "http://localhost/codeigniter/popdelete";
  private save = "http://localhost/codeigniter/save";

  /**
   * to store all the inforamtion entred by the user in the card
   * @param mode5 title and note
   * @param email to store the email
   * @param datetime to store the date time
   * @param color to store the color of the card
   * @param archive to store the archive card
   * @param label to store the label
   * @param collabarr to store the collabed email
   */
  store(mode5, email, datetime, color, archive, label, collabarr) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("email", email);
    params.append("title", mode5.title);
    params.append("note", mode5.note);
    params.append("date", datetime);
    params.append("color", color)
    params.append("archive", archive);
    params.append("label", label);
    params.append("collab", collabarr)
    params.append("owner", this.cookie.get("email"));

    return this.http.post(this.storenote, params, otheroption);
  }
  // for fetch the data from the database

  /**
   * to fetch all the information once the page is reloaded
   * @param email to store the email
   */
  storeRefresh(email) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'

    }
    const params = new FormData();
    params.append("email", email);

    // return this.http.post(this.fetch, params, otheroption).pipe(
    //   map((res: Response) => res)
    // )
    return this.http.post(this.fetch, params, otheroption);

  }
  // to update the color of the card in db
  /**
   * 
   * @param idcard id of the card
   * @param colorcard color of the card
   */
  updateTheCard(idcard, colorcard) {


    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("idcard", idcard);
    params.append("colorcard", colorcard);
    return this.http.post(this.colorurl, params, otheroption);

  }
  /**
   *updating the note on db when card title and note is changed 
   * @param idcard id of the card
   * @param model the store the note and title
   */
  updateNoteDb(idcard, model) {
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("idcard", idcard);
    params.append("colorcard", model.note);
    params.append("colorcard", model.title);
    return this.http.post(this.colorurl, params, otheroption)
  }
  /**
   *to update the reminder into db 
   * @param idcard id of the card
   * @param model the store the note and title
   */
  updateReminder(id, model) {
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("idcard", id);
    params.append("date", model);
    return this.http.post(this.resultcard, params, otheroption)
  }

  /**
   * to delete the reminder from the card and update in the db
   * @param id id of the card
   */
  deleteReminder(id) {
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("idcard", id);
    return this.http.post(this.deletereminder, params, otheroption)

  }

  /**
   * note for pop card reminder
   * @param id id of the card
   * @param datas to get all the data from note
   */
  popUpdateReminder(id, datas) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("id", id);
    params.append("colorcode", datas.colorcode);
    params.append("email", datas.email);
    params.append("note", datas.note);
    params.append("title", datas.title);
    params.append("dateandtime", datas.date);
    const res = datas;
    return this.http.post(this.popedit, params, otheroption)
  }

  /**
   * to delete the note when the card is selected
   * @param id id of the card
   */
  deleteNote(id) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("idcard", id);
    return this.http.post(this.popdelete, params, otheroption)

  }
  /**
   * to save all the changes made to the card in db 
   * @param allData store all the data of that card
   */
  saveData(allData) {

    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("id", allData.id);
    params.append("colorcode", allData.colorcode);
    params.append("email", allData.email);
    params.append("note", allData.note);
    params.append("title", allData.title);
    params.append("dateandtime", allData.date);
    const res = allData;
    return this.http.post(this.save, params, otheroption)
  }
  //main ends
}

