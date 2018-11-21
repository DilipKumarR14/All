import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'angular2-cookie';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private http: HttpClient, private cookie: CookieService) { }
  private archivedUrl = "http://localhost/codeigniter/isArchive";
  private unarchiveurl = "http://localhost/codeigniter/unarchive";
  
  archiveNote(id){
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const params = new FormData();
    params.append("id",id);
    return this.http.post(this.archivedUrl,params,otheroption);

  }
  unarchive(id){
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const params = new FormData();
    params.append("id",id);
    return this.http.post(this.unarchiveurl,params,otheroption);

  }


  res = "";
  email = "";
  mode: any = {};

  private archiveres = "http://localhost/codeigniter/archivereceive";

  private fetch = "http://localhost/codeigniter/archiverefresh";

  private colorurl = "http://localhost/codeigniter/color";
  private resultcard = "http://localhost/codeigniter/resultcard";
  private deletereminder = "http://localhost/codeigniter/deletecard";
  private popedit = "http://localhost/codeigniter/popedit";
  private popdelete = "http://localhost/codeigniter/popdelete";
  private save = "http://localhost/codeigniter/save";

  store(mode5, email, datetime, color) {
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("email", email);
    params.append("title", mode5.title);
    params.append("note", mode5.note);
    params.append("date", datetime);
    params.append("color", color)
    
    console.log(params);

    return this.http.post(this.archiveres, params, otheroption);
  }
// for fetch the data from the database
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
  updateTheCard(idcard, colorcard) {


    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("idcard", idcard);
    params.append("colorcard", colorcard);
    return this.http.post(this.colorurl, params, otheroption);

  }
  //updating the note on db when card title and note is changed
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
// to update the reminder into db
  updateReminder(id, model) {
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("idcard", id);
    params.append("date", model);
    return this.http.post(this.resultcard, params, otheroption)
  }
// to delete the reminder from the card and update in the db
  deleteReminder(id) {
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("idcard", id);
    return this.http.post(this.deletereminder, params, otheroption)

  }

  // note for pop card reminder
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

  // to delete the note when the card is selected
  deleteNote(id) {
    
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("idcard", id);
    return this.http.post(this.popdelete, params, otheroption)

  }

  // to save all the changes made to the card in db
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

}
