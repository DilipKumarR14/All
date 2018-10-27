import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoteService } from '../service/note.service';
import {CookieService} from 'angular2-cookie';
@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

    
public title = new FormControl();
public note = new FormControl();
public temp=false;
title1="";
note1="";
email = this.cookie.get("email");
time="";
model: any = {};
res2 = "";
exp = false;
res = false;
public date=new Date();

// when the button is clicked on time setting later today
settime(){
    this.time = "Later Today 8PM ";
    this.res = true;
}
// when the button is clicked on time setting for tomorrow
settimetomo(){
    this.time = "Tomorrow 8.00PM";
}
// when the button is clicked on time setting for next week
settimeweek(){
    this.time = "Next Week 8.00PM"
}
    maincard: boolean = true;
    expcard: boolean = false;
    displaycard:boolean = true;
    test: any;


    constructor(private service: NoteService,private cookie:CookieService) {
        debugger;
        this.service.storeRefresh(this.email).subscribe((status: any) => {
            debugger;
            this.test=status;
    });
    }
expan(){
this.exp = true;
}
expanclose(){
    this.exp = false;
}
    ngOnInit() {
        debugger;
        this.service.storeRefresh(this.email).subscribe((status: any) => {
            debugger;
            this.test=status;
    });
    }
    matcardVisbility() {
        this.maincard = false;
        this.expcard = true;
    }
    expcardVisibiilty() {
        this.expcard = false;
        this.maincard = true;
    }

    // when the close is clicked on the card for savinf to database
    save() {
        // var fetch = this.model;
        debugger;
        if(this.model.title != null || this.model.note != null )
          this.service.store(this.model,this.email).subscribe((status: any) => {
                debugger;
                this.test=status;

        });     
    }

}
