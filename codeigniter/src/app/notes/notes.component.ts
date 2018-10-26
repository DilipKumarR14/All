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
title1="";
note1="";
email = this.cookie.get("email");
time="";
model: any = {};
res2 = "";


settime(){
    this.time = "Later Today 8PM ";
}
settimetomo(){
    this.time = "Tomorrow 8.00PM";
}
settimeweek(){
    this.time = "Next Week 8.00PM"
}
    maincard: boolean = true;
    expcard: boolean = false;
    displaycard:boolean = true;
    test: any;
    constructor(private service: NoteService,private cookie:CookieService) {
 
            this.service.store(this.model,this.email).subscribe((status: any) => {
                debugger;
                this.test=status;
        });
    }
    stopPropagation(event){
        event.stopPropagation();
        // console.log("Clicked!");
      }
    ngOnInit() {
        
    }
    matcardVisbility() {
        this.maincard = false;
        this.expcard = true;
    }
    expcardVisibiilty() {
        this.expcard = false;
        this.maincard = true;
    }
    
    save() {
        // var fetch = this.model;
        debugger;
        this.email = this.cookie.get("email");

        this.service.store(this.model,this.email).subscribe((status: any) => {
                debugger;
                this.test=status;
        });
    }
   
   mat(color){

   }
}
