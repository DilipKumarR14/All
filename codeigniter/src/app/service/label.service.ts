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
mode:any;
// to store the label into db 
  label(mode){
    
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("label",mode.label);
    const email  = this.cookie.get("email");
    params.append("email",email)
    return this.http.post(this.url,params,otheroption);

  }
  // to fetch the label from the database
  fetchlabel(){
    
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    const email  = this.cookie.get("email");
    params.append("email",email)
    return this.http.post(this.fetch,params,otheroption);
  }

// for delete the label from the database
  delete(id){
    
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("id",id);
    return this.http.post(this.deletelabel,params,otheroption);
  }


  editLabel(id,data){
    
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("id",id);
    params.append("label",data);
    return this.http.post(this.editLabelurl,params,otheroption);
  }

  addLabel(email){
    
    let otheroption: any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new FormData();
    params.append("email",email)
    return this.http.post(this.addlabel,params,otheroption);
  }

  private labelcard = "http://localhost/codeigniter/addLabelCard";

  addLabelCard(id,labelname){
    
    let otheroption :any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const params = new FormData();
    params.append("id",id);
    params.append("labelname",labelname);
    return this.http.post(this.labelcard,params,otheroption);
  }

  private labeldelete = "http://localhost/codeigniter/deleteLabelCard";

  deleteLabelCard(id){
    
    let otheroption :any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const params = new FormData();
    params.append("id",id);
    return this.http.post(this.labeldelete,params,otheroption);
  }

  private eachlabel = "http://localhost/codeigniter/getLabel";
  getLabelForCard(label){
    
    let otheroption :any = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const params = new FormData();
    params.append("label",label);
    return this.http.post(this.eachlabel,params,otheroption);
  }


}
