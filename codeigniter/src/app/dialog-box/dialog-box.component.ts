import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../fundoo/fundoo.component';
import { LabelService } from '../service/label.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  test: any;

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private service: LabelService) { }

  onNoClick() {
    debugger;
    this.dialogRef.close(this.items);
  }
  items: any;
  labels() {
    debugger;
    this.service.label(this.data).subscribe(
      (status: any) => {
        debugger;
        this.items = status;
        this.dialogRef.close(status);
      }
    );
    // this.dialogRef.close(this.items);

  }

  fetchnote(){
    debugger;
    this.service.fetchlabel().subscribe(
      (status:any)=>{
        this.items = status;
      }
    )
  }

  ngOnInit()
  {
    this.fetchnote();
  }
}
