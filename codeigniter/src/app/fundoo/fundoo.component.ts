import { Component, Inject, OnInit } from '@angular/core';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog} from '@angular/material';
import { CommondataService } from "../service/commondata.service";
import {CookieService} from 'angular2-cookie';
import { Router } from '@angular/router';
import { LabelService } from '../service/label.service';

export interface DialogData {
  label: string;
}

@Component({
  selector: 'app-fundoo',
  templateUrl: './fundoo.component.html',
  styleUrls: ['./fundoo.component.css'],
})

export class FundooComponent implements OnInit{
  label: string;
  panelOpenState = false;
  items;

  constructor(public dialog: MatDialog,private commondata:CommondataService,private cookie:CookieService,private router:Router,private service: LabelService) { 
    
    }
 

    imgloc:string =  "../../assets/img/login/listview.svg";
    view:boolean = false;
    viewtip:string="Grid_View";
      
    toggle(){
      this.view = !this.view
      if (this.view) {
        this.imgloc = "../../assets/img/login/gridview.svg";    
        this.viewtip = "Grid_View";
      }
      else{
        this.imgloc = "../../assets/img/login/listview.svg";
        this.viewtip = "List_View";
      }
      //notify the commondata service true/false
      this.commondata.commonData(this.view);
      
    }

  openDialog(): void {
    debugger;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '35%',
      data: { label: this.label }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined)
      this.items = result;
    });
  }
  public changeIcon;
  icon: any = true;

  viewNote() {
    if(this.icon == true){
      this.icon = "view_module";
    }
    else{
      this.changeIcon = "view_module";
    }    
  }

  logout(){
    
    this.cookie.remove("email");
    localStorage.removeItem("token");
    this.router.navigate(['/logins']);
  }

  fetchnote(){
    debugger;
    this.service.fetchlabel().subscribe(
      (status:any)=>{
        this.items = status;
      }
    )
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.

    this.service.fetchlabel().subscribe(
      (status:any)=>{
        this.items = status;
      }
    )
  }

}

