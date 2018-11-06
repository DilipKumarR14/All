import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../fundoo/fundoo.component';

@Component({
  selector: 'app-updatecard',
  templateUrl: './updatecard.component.html',
  styleUrls: ['./updatecard.component.css']
})
export class UpdatecardComponent implements OnInit {
  notes;
  ngOnInit() {
  }
  constructor(public dialogRef: MatDialogRef<UpdatecardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  // title = this.data.se.title;
  // note = this.data.se.note;
  // title = this.data;
  // note  = this.data;

  onNoClick(): void {
    debugger;
    // this.notes=this.data.se.id;
    console.log(this.notes)
    this.dialogRef.close();
  }




}
