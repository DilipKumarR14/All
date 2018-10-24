import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../service/database.service';
import { FormControl,Validators } from '@angular/forms';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

//    imageUpload(event) {
//       debugger;
//         const file = event.target.files;
//         let res  = file;
//         debugger
//     }
public title = new FormControl();
public note = new FormControl();
title1="";
note1="";
model: any = {};

    public items = [1];

    maincard: boolean = true;
    expcard: boolean = false;
    displaycard:boolean = true;
    constructor(private service: DatabaseService) {

    }

    ngOnInit() {

    }
    matcardVisbility() {
        this.maincard = false;
        this.expcard = true;
        // this.displaycard = false;
    }
    expcardVisibiilty() {
        this.expcard = false;
        this.maincard = true;
        // this.displaycard = true;
    }
    
    save() {
        debugger;
        var fetch = this.model;
        this.service.store(this.model).subscribe(
            // data returned will be stored in status variable
            (status: any) => {
                debugger;
                if (status.title != "") {
                    debugger;
                    console.log("got respo", status);
                    this.title1 = status.title;
                    this.note1 = status.note;
                }
                else {
                    console.log(status.status)
                    this.title1 = status.title1;
                    alert("Not Fetched")
                }

            }
        );
    }
   
   
}
